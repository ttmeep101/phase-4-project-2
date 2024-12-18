import React from "react";
import "./index.css";
import ReactDOM from 'react-dom/client'
import routes from "./components/Routes";
import { RouterProvider } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={routes} />
    </React.StrictMode>
);
