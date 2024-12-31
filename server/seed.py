#!/usr/bin/env python3
# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Listing, Image
import random

with app.app_context():
    #create and initialize a fake generator
    fake = Faker()

    #delete all row in User table
    User.query.delete()

    # # #create an empty list
    users = []

    # # #add some user instances to the list
    for n in range(5):
        user = User(
            username=fake.user_name(),
            password_hash='password',
            name=fake.first_name(),
            age=random.randint(18, 120)
        )
        users.append(user)
    
    db.session.add_all(users)
    db.session.commit()

    #delete all row in Listing table
    Listing.query.delete()

    #create an empty list
    listings = []
    amenities = ['backyard', 'pool', 'porch', 'laundry', 'elevator', 'A/C', 'parking', 'pets allowed']

    #add some listings instances to the list
    for item in range(15):
        listing = Listing(
            price=random.randint(50000, 1000000000),
            address=fake.address(),
            sqft=random.randint(100, 10000),
            bedroom=random.randint(1, 20),
            bathroom=random.randint(1, 20),
            kitchen=random.randint(1, 20),
            amenity=rc(amenities),
            pets=fake.boolean(),
            user_id=1
            )
        listings.append(listing)
    
    db.session.add_all(listings)
    db.session.commit()

    roomTypes = ['exterior', 'bedroom', 'kitchen', 'livingroom']
    Image.query.delete()

    images = []
    for i in range(1,16):
        for roomType in roomTypes:
            randomNumber = random.randint(1, 6)
            image = Image(
                file=f"/images/{roomType}{randomNumber}.png",
                listing_id=i
            )
            images.append(image)
    
    db.session.add_all(images)
    db.session.commit()
    

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
