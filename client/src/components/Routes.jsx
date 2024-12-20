import { createBrowserRouter } from "react-router-dom";
import Home from './Home'
import Listings from './Listings'
import Bookings from './Bookings'
import Signin from './Signin'
import HouseDetails from "./HouseDetails";
import App from "./App";

const routes = createBrowserRouter([{
    path: "/", element: <App />,
  children: [
    { path: '/', element: <Home /> },
    { path: '/listings', element: <Listings /> },
    { path: '/listings/:id', element: <HouseDetails /> },
    { path: '/bookings', element: <Bookings /> },
    { path: '/signin', element: <Signin /> }
  ]
}])

export default routes