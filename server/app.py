#!/usr/bin/env python3
# Standard library imports

# Remote library imports
from flask_migrate import Migrate
from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource
from sqlalchemy.exc import NoResultFound
import os

# Local imports
from config import app, db, api
from models import db, Listing, User, Booking
# Add your model imports

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

# Views go here!
class Listings(Resource):
    def get(self):
        try:
            listings = db.session.execute(db.select(Listing)).scalars()
            list_listings = [listing.to_dict() for listing in listings]
            return make_response(list_listings)
        except:
            return make_response({'error': 'Listings not found'}, 404)
    
    def post(self):
        try:
            param = request.json
            new_listing = Listing(
                price=param['price'],
                address=param['address'],
                sqft=param['sqft'],
                bedroom=param['bedroom'],
                bathroom=param['bathroom'],
                kitchen=param['kitchen'],
                amenity=param['amenity'],
                image=param['image'],
                pets=param['pets']
            )
            db.session.add(new_listing)
            db.session.commit()
            return make_response(new_listing.to_dict(), 201)
        except:
            return make_response({'error': ['validation errors']}, 400)
    
class ListingsById(Resource):
    def get(self, id):
        try:
            listing = db.session.execute(db.select(Listing).filter_by(id=id)).scalar_one()
            return make_response(listing.to_dict())
        except:
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
        except:
            return make_response({'error': ['validation errors']}, 400)
    
    def delete(self, id):
        try:
            listing = db.session.execute(db.select(Listing).filter_by(id=id)).scalar_one()
            db.session.delete(listing)
            db.session.commit()
            return make_response(jsonify(''), 404)
        except:
            return make_response({'error': 'Listing not found'}, 404)

class Bookings(Resource):
    def get(self, id):
        try:
            bookings = db.session.execute(db.select(Booking)).scalars()
            list_booking = [booking.to_dict() for booking in bookings]
            return make_response(bookings.to_dict())
        except:
            return make_response({'error': 'Booking not found'}, 404)
    
    def post(self):
        try:
            param = request.json
            new_booking = Booking(
                time=param['time'],
                date=param['date'],
                user_id=param['user_id'],
                listing_id=param['listing_id']
            )
            db.session.add(new_booking)
            db.session.commit()
            return make_response(new_booking.to_dict(), 201)
        except:
            return make_response({'error': ['validation errors']}, 400)

class BookingsById(Resource):
    def get(self, id):
        try:
            booking = db.session.execute(db.select(Booking).filter_by(id=id)).scalar_one()
            return make_response(booking.to_dict())
        except:
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
        except:
            return make_response({'error': ['validation errors']}, 400)
    
    def delete(self, id):
        try:
            booking = db.session.execute(db.select(Booking).filter_by(id=id)).scalar_one()
            db.session.delete(booking)
            db.session.commit()
            return make_response(jsonify(''), 404)
        except:
            return make_response({'error': 'Booking not found'}, 404)

api.add_resource(Listings, '/listings')
api.add_resource(ListingsById, '/listings/<int:id>')
api.add_resource(Bookings, '/bookings')
api.add_resource(BookingsById, '/bookings/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

