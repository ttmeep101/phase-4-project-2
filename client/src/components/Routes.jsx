import { createBrowserRouter } from "react-router-dom";
import Home from './Home'
import Listings from './Listings'
import Bookings from './Bookings'
import Signin from './Signin'

const routes = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/listings', element: <Listings /> },
    { path: '/bookings', element: <Bookings /> },
    { path: '/signin', element: <Signin /> }
])

export default routes