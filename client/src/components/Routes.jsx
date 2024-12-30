import { createBrowserRouter } from "react-router-dom";
import Home from './Home'
import Listings from './Listings'
import Bookings from './Bookings'
import Signin from './Signin'
import HouseDetails from "./HouseDetails";
import HouseImages from "./HouseImages";
import SingleImage from "./SingleImage";
import App from "./App";
import NewListing from "./NewListing";

const routes = createBrowserRouter([{
    path: "/", element: <App />,
  children: [
    { path: '/', element: <Home /> },
    { path: '/listings', element: <Listings /> },
    { path: '/listings', element: <NewListing /> },
    { path: '/listings/:id', element: <HouseDetails /> },
    { path: '/listings/:id/images', element: <HouseImages /> },
    { path: '/bookings', element: <Bookings /> },
    { path: '/signin', element: <Signin /> },
    { path: '/create-listing', element: <NewListing /> },
    { path: '/images/:id', element: <SingleImage /> },
  ]
}])

export default routes