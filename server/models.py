from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
import datetime

from config import db

# Models go here!
class Listing(db.Model, SerializerMixin):
    __tablename__ = 'listings'
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer)
    address = db.Column(db.String)
    sqft = db.Column(db.Integer)
    bedroom_amt = db.Column(db.Integer)
    bathroom_amt = db.Column(db.Integer)
    kitchen = db.Column(db.Boolean)
    amenities = db.Column(db.String)

    #relationship
    bookings = db.relationship('Booking', back_populates='listings', cascade='all, delete-orphan')
    users = association_proxy('bookings', 'user')

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    # password = db.Column(db.String)
    name = db.Column(db.String)
    age = db.Column(db.Integer)

    #relationship
    bookings = db.relationship('Booking', back_populates='users', cascade='all, delete-orphan')
    listings = association_proxy('bookings', 'listing')

class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    #is date and time together??
    time = db.Column(db.DateTime)
    date = db.Column(db.DateTime)
    user_id = db.Column(db.String, db.ForeignKey('users.id'))
    listing_id = db.Column(db.String, db.ForeignKey('listings.id'))

    #relationship
    user = db.relationship('User', back_populates='bookings')
    listing = db.relationship('Listing', back_populates='bookings')

# class Review(db.Model, SerializerMixin):
#     __tablename__ = 'reviews'
#     id = db.Column(db.Integer, primary_key=True)
#     stars = db.Column(db.Integer)
#     #is it gonna be connected to booking or listing?
#     booking_id = db.Column(db.String, db.ForeignKey('bookings.id'))
