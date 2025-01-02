# RENTER

## Description

"Renter" is a comprehensive web application designed to streamline the rental process for both renters and property owners. Users can easily search for available rental properties, book them directly, and manage their bookings all in one place. For property owners, Renter offers the ability to create, edit, and delete their listings, giving them full control over their rental offerings. Whether you're looking for a place to stay or managing your own rental properties, Renter provides an intuitive platform to simplify the experience.

## Features

- Create and sign into your account
- Create and view listings
- Full CRUD functionality with listings
- Filter listings by cost and view personal listings
- Create a booking with a listing on a time of choice

## Setup

1. Clone the Github Repo
2. Navigate to the server directory
3. Ensure you have the proper dependencies installed:
```console
pip install flask flask-sqlalchemy flask-migrate flask-cors
```
4. Create a pipenv shell to work in:
```console
pipenv install
pipenv shell
```
5. Create and upgrade the SQL database:
```console
export FLASK_RUN=app.py
flask db init
flask db migrate
flask db upgrade
```
6. Finally, run the flask server:
```console
flask run
```
7. Now for the frontend, navigate out of the server directory and into the client directory
8. Install dependencies:
```console
npm install
```
9. Run the frontend server:
```console
npm start
```
10. Your program should now be up and running!

## Routes

### Listings

- GET ```/listings```: returns a list of all listings in the database
- POST ```/listings```: creates a new listing within the database
- GET ```/listings/<id>```: returns a listing at the specified id
- PUT ```/listings/<id>```: updates a listing with new information at a specified id
- DELETE ```/listings/<id>```: permanently removes a listing from the database at a specified id

### Bookings

- GET ```/bookings```: returns a list of bookings in the database
- POST ```/bookings```: creates a new booking within the database
- GET ```/bookings/<id>```: returns a booking at the specified id
- PATCH ```/bookings/<id>```: updates a booking with given information at a specified id
-DELETE ```/bookings/<id>```: permanently removes a booking from the database at a specified id
-GET ```/users-bookings/<id>```: returns a the user owner of a booking at a specified id

### Signup

- POST ```/signup```: creates a new user within the database and signs them in
- GET ```/check```: returns the current user that the session belongs to
- POST ```/login```: creates a new login request using existing users in the database and signs them in
- DELETE ```/logout```: removes the current user's session (signs them out)

### Images

- GET ```/listings-images```: returns a list of all images in the database
- GET ```/listings-images/<id>```: returns an image at the specified id
- POST ```/listings-images/<id>```: creates a new image to add to the collection at the specified id
- DELETE ```/listings-images/<id>```: permanently removes an image or collection of images from a specified id

## Usage

### Sign-in

1. Navigate to the 'Sign In' page
2. If you are creating a new account, select the register new account button
3. Enter your credentials to sign in, if successful you will recieve an alert confirming your sign in and be redirected to the home page
4. While signed in, you can fully access the features of this website, but you can always log out at any point by selecting the logout button in the navbar

### Creating and Viewing Listings

1. To add a listing, sign in and navigate to the 'Create Listing' page
2. Enter in all of the information about the listing and click submit to confirm it being added
3. To view listings, navigate to the 'Listings' page
4. From here, you may sort by price, and click on a listing to view more information

### Altering Your Listings

1. While signed in, navigate to the 'My Listings' page
2. From here, you can view all of your current listings, click on the one that you wish to alter to pull up its full detailed information
3. If you wish to delete a listing, simply click the delete button and confirm it's removal WARNING: THIS ACTION CANNOT BE UNDONE
4. If you wish to edit a listing, click the edit button to pull up it's information, and change it as you want. Images will have to be reattached, but otherwise you can make changes using it's current information

### Bookings

1. While signed in, navigate to the 'Listings' page
2. Click on a listing you're interested in and select 'Add to Booking'
3. Enter the time and date in which you wish to make the booking, and select Submit
4. You now can navigate to the 'Bookings' page to view all of your current bookings
5. Clicking on them will once again allow you to view the details of the listing
6. If you wish to cancel a booking, simply hit the remove booking button to cancel it



