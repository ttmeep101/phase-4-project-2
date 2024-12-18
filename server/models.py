from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import datetime

from config import db, bcrypt

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

# Models go here!
class Listing(db.Model, SerializerMixin):
    __tablename__ = 'listings'
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String, nullable=False)
    sqft = db.Column(db.Integer, nullable=False)
    bedroom = db.Column(db.Integer)
    bathroom = db.Column(db.Integer)
    kitchen = db.Column(db.Integer)
    amenity = db.Column(db.String)
    # image =

    #relationship
    bookings = db.relationship('Booking', back_populates='listing', cascade='all, delete-orphan')
    users = association_proxy('bookings', 'user')

    # Add validation
    @validates('price')
    def validate_price(self, key, value):
        if not value or (value < 50000):
            raise ValueError('Listing must have a price and min 50k')
        return value
    
    @validates('address')
    def validate_address(self, key, value):
        if not value or (len(value) < 10):
            raise ValueError('Listing must have a address and min 10 chars')
        return value
    
    @validates('sqft')
    def validate_sqft(self, key, value):
        if not value or (value < 100):
            raise ValueError('Listing must have a sq footage and min 100 sq ft')
        return value
    
    @validates('bedroom')
    def validate_bedroom(self, key, value):
        if not isinstance(value, int):
            raise ValueError('Listing must have a bedroom')
        elif value < 0:
            raise ValueError('Listing must not be negative')
        return value
    
    @validates('bathroom')
    def validate_bathroom(self, key, value):
        if not isinstance(value, int):
            raise ValueError('Listing must have a bathroom')
        elif value < 0:
            raise ValueError('Listing must not be negative')
        return value
    
    @validates('kitchen')
    def validate_kitchen(self, key, value):
        if not isinstance(value, int):
            raise ValueError('Listing must have a kitchen')
        elif value < 0:
            raise ValueError('Listing must not be negative')
        return value
    
    @validates('amenity')
    def validate_amenity(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('Listing must have a amenity')
        return value
    
    # bedroom, bath, kitchen must match sqft and price

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)

    # Add validation
    @validates('name')
    def validate_name(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('User must have a name')
        return value
    
    @validates('username')
    def validate_username(self, key, value):
        if not value or (len(value) < 1):
            raise ValueError('User must have a username')
        return value
    
    @validates('age')
    def validate_age(self, key, value):
        if not value or (value < 18):
            raise ValueError('User must have a age and must be 18 y.o. and up')
        return value

    @property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    #relationship
    bookings = db.relationship('Booking', back_populates='user', cascade='all, delete-orphan')
    listings = association_proxy('bookings', 'listing')

class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    #is date and time together??
    time = db.Column(db.DateTime, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('users.id'))
    listing_id = db.Column(db.String, db.ForeignKey('listings.id'))

    #relationship
    user = db.relationship('User', back_populates='bookings')
    listing = db.relationship('Listing', back_populates='bookings')

    # Add validation
    @validates('time')
    def validate_time(self, key, value):
        if not value:
            raise ValueError('Booking must have a time')
        return value
    
    @validates('date')
    def validate_date(self, key, value):
        if not value:
            raise ValueError('Booking must have a date')
        return value

# class Review(db.Model, SerializerMixin):
#     __tablename__ = 'reviews'
#     id = db.Column(db.Integer, primary_key=True)
#     stars = db.Column(db.Integer)
#     #is it gonna be connected to booking or listing?
#     booking_id = db.Column(db.String, db.ForeignKey('bookings.id'))

# class Agent(db.Model, SerializerMixin):
#     __tablename__ = 'reviews'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String)
#     #is it gonna be connected to booking or listing?
#     booking_id = db.Column(db.String, db.ForeignKey('bookings.id'))
#     # Add validation
#     @validates('name')
#     def validate_name(self, key, value):
#         if not value or (len(value) < 1):
#             raise ValueError('User must have a name')
#         return value
