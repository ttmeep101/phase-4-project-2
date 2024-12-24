#!/usr/bin/env python3
# Standard library imports

# Remote library imports
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify, session
from flask_restful import Api, Resource
from sqlalchemy.exc import NoResultFound
from werkzeug.security import generate_password_hash, check_password_hash
from dateutil import parser

import os

# Local imports
from config import app, db, api
from models import db, Listing, User, Booking, Image
from flask_cors import CORS

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__,
            static_folder='images')
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False
CORS(app)

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

app.secret_key = b'y$2\xa7l\x89\xb0\t\x87\xb5\x1abf\xff\xeb\xd5'

# Views go here!
class Listings(Resource):
    def get(self):
        try:
            listings = db.session.execute(db.select(Listing)).scalars()
            list_listings = [lst.to_dict(rules=('-bookings',)) for lst in listings]
            return make_response(list_listings)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'Listings not found'}, 404)
    
    def post(self):
        try:
            param = request.json
            print(param)
            new_listing = Listing(
                price=param['price'],
                address=param['address'],
                sqft=param['sqft'],
                bedroom=param['bedroom'],
                bathroom=param['bathroom'],
                kitchen=param['kitchen'],
                amenity=param['amenity'],
                pets=param['pets']
            )
            db.session.add(new_listing)
            db.session.commit()
            return make_response(new_listing.to_dict(), 201)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': ['validation errors']}, 400)
    
class ListingsById(Resource):
    def get(self, id):
        try:
            listing = db.session.execute(db.select(Listing).filter_by(id=id)).scalar_one()
            return make_response(listing.to_dict())
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'Listing not found'}, 404)
        
    def patch(self, id):
        try:
            listing = db.session.execute(db.select(Listing).filter_by(id=id)).scalar_one()
            param = request.json
            for attr in param:
                setattr(listing, attr, param['attr'])
            db.session.commit()
            return make_response(listing.to_dict(), 202)
        except NoResultFound:
            return make_response({'error': 'Listing not found'}, 404)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': ['validation errors']}, 400)
    
    def delete(self, id):
        try:
            listing = db.session.execute(db.select(Listing).filter_by(id=id)).scalar_one()
            db.session.delete(listing)
            db.session.commit()
            return make_response(jsonify(''), 404)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'Listing not found'}, 404)
        
api.add_resource(Listings, '/listings')
api.add_resource(ListingsById, '/listings/<int:id>')

class Bookings(Resource):
    def get(self):
        try:
            bookings = db.session.execute(db.select(Booking)).scalars()
            list_booking = [booking.to_dict() for booking in bookings]
            return make_response(list_booking)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'Booking not found'}, 404)
    
    def post(self):
        try:
            param = request.json
            new_booking = Booking(
                date_time=parser.parse(param['date_time']),
                user_id=param['user_id'],
                listing_id=param['listing_id']
            )
            db.session.add(new_booking)
            db.session.commit()
            return make_response(new_booking.to_dict(), 201)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': ['validation errors']}, 400)

class BookingsById(Resource):
    def get(self, id):
        try:
            booking = db.session.execute(db.select(Booking).filter_by(id=id)).scalar_one()
            return make_response(booking.to_dict())
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'Booking not found'}, 404)
        
    def patch(self, id):
        try:
            booking = db.session.execute(db.select(Booking).filter_by(id=id)).scalar_one()
            param = request.json
            for attr in param:
                setattr(booking, attr, param['attr'])
            db.session.commit()
            return make_response(booking.to_dict(), 202)
        except NoResultFound:
            return make_response({'error': 'Booking not found'}, 404)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': ['validation errors']}, 400)
    
    def delete(self, id):
        try:
            booking = db.session.execute(db.select(Booking).filter_by(id=id)).scalar_one()
            db.session.delete(booking)
            db.session.commit()
            return make_response(jsonify(''), 200)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'Booking not found'}, 404)

api.add_resource(Bookings, '/bookings')
api.add_resource(BookingsById, '/bookings/<int:id>')

class Signup(Resource):
    def post(self):
        params = request.json
        try:
            username = params.get('username')
            password = params.get('password')
            age = params.get('age')
            name = params.get('name')

            if not username or not password or not age or not name:
                return make_response({'error': 'Missing required fields'}, 400)
            
            existing_user = User.query.filter_by(username=username).first()
            if existing_user:
                return make_response({'error': 'Username already exists'}, 400)

            
            user = User(username=username, password_hash=password, age=age, name=name)

            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return make_response(user.to_dict(), 201)

        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'failed to sign up'})
        
api.add_resource(Signup, '/signup')

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = db.session.get(User, user_id)
            if user:
                return make_response(user.to_dict(), 200)
        return make_response({'error': 'No authorization'}, 401)

api.add_resource(CheckSession, '/check')

class Login(Resource):
    def post(self):
        params = request.json

        user = params.get('username')
        password = params.get('password')

        if not user or not password:
            return make_response({'error': 'Username and password are required'}, 400)
        
        user = db.session.query(User).filter_by(username=user).first()

        if not user:
            return make_response({'error': 'user not found'}, 404)

        if user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(), 200)
        else:
            print('invalid password')
            return make_response({'error': 'invalid password'}, 401)

api.add_resource(Login, '/login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({}, 204)
    
api.add_resource(Logout, '/logout')

class Images(Resource):
    def get(self):
        try:
            images = db.session.execute(db.select(Image)).scalars()
            imgs = [img.to_dict() for img in images]
            return make_response(imgs)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'Images not found'}, 404)

class ImagesByListingId(Resource):
    def get(self, id):
        try:
            images = db.session.execute(db.select(Image).filter_by(listing_id=id)).scalars()
            images_for_listing = [img.to_dict(rules=('-listing',)) for img in images]
            return make_response(images_for_listing)
        except Exception as e:
            print(f'error occured: {e}')
            return make_response({'error': 'Images not found'}, 404)
        
api.add_resource(Images, '/listing-images')
api.add_resource(ImagesByListingId, '/listing-images/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

