# RENTER

# Phase 4 Full-Stack Application Project

## Description

"Renter" is a comprehensive web application designed to streamline the rental process for both renters and property owners. Users can easily search for available rental properties, book them directly, and manage their bookings all in one place. For property owners, Renter offers the ability to create, edit, and delete their listings, giving them full control over their rental offerings. Whether you're looking for a place to stay or managing your own rental properties, Renter provides an intuitive platform to simplify the experience.

---

## Generating your environment


```console
$ tree -L 2
$ # the -L argument limits the depth at which we look into the directory structure
.
├── CONTRIBUTING.md
├── LICENSE.md
├── Pipfile
├── README.md
├── client
│   ├── README.md
│   ├── package.json
│   ├── public
│   └── src
└── server
    ├── app.py
    ├── config.py
    ├── models.py
    └── seed.py
```

---

## Setup

### `server/`

The `server/` directory contains all of your backend code.

`app.py` is your Flask application. You'll want to use Flask to build a simple
API backend like we have in previous modules. You should use Flask-RESTful for
your routes. You should be familiar with `models.py` and `seed.py` by now, but
remember that you will need to use Flask-SQLAlchemy, Flask-Migrate, and
SQLAlchemy-Serializer instead of SQLAlchemy and Alembic in your models.

The project contains a default `Pipfile` with some basic dependencies. You may
adapt the `Pipfile` if there are additional dependencies you want to add for
your project.

To download the dependencies for the backend server, run:

```console
pipenv install
pipenv shell
```

You can run your Flask API on [`localhost:5555`](http://localhost:5555) by
running:

```console
python server/app.py
```

Check that your server serves the default route `http://localhost:5555`. You
should see a web page with the heading "Project Server".

### `client/`

The `client/` directory contains all of your frontend code. The file
`package.json` has been configured with common React application dependencies,
include `react-router-dom`. The file also sets the `proxy` field to forward
requests to `"http://localhost:5555". Feel free to change this to another port-
just remember to configure your Flask app to use another port as well!

To download the dependencies for the frontend client, run:

```console
npm install --prefix client
```

You can run your React app on [`localhost:3000`](http://localhost:3000) by
running:

```sh
npm start --prefix client
```

Check that your the React client displays a default page
`http://localhost:3000`. You should see a web page with the heading "Project
Client".

## Generating Your Database

INFO HERE

---

## Routes/Models?

INFO HERE

---

## Key Features

### See all available listings

Browse all our listings in one convenient place! Whether you're looking for an apartment, house, or vacation rental, we offer a wide variety of options to fit your needs. With everything in one spot, finding your next rental has never been easier. Explore our listings today and discover the perfect place for you!

### Search for listings

Browse through detailed listings, view high-quality photos, and explore real-time availability— all in one place. Finding your perfect rental has never been easier. Our platform offers a seamless, user-friendly experience with powerful search filters to help you narrow down options based on your needs and preferences. Start your search today and discover your next home with ease!

### Manage your bookings

Once you are signed in, easily manage your apartment tour bookings with our web application.. Schedule, reschedule, or cancel tours at your own convenience, all in one place. Keep track of upcoming appointments, set reminders, and ensure you never miss a showing. Whether you're a renter or a property manager, our web app makes apartment tour booking management seamless and efficient.

### Manage your rentals

Our platform lets you stay on top of everything—from listing your properties and handling bookings. With streamlined tools for scheduling, editing and deleting your own rentals, you can effortlessly keep your rental business organized and efficient. Take control of your properties and enjoy a hassle-free management experience today!

---

## Conclusion

"Renter" offers a user-friendly and efficient solution for both renters and property owners, simplifying the entire rental process. With its powerful features—searching for rentals, booking with ease, managing reservations, and providing full control over property listings—Renter enhances the experience for everyone involved. Whether you're seeking a place to stay or looking to list and manage your own property, Renter provides the tools you need to make the process seamless and hassle-free.
