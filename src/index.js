import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupForm from "./signup";
import App from "./App";
import "./index.css";
import LoginForm from "./login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeData from "./employeedata";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "login",
    element: <LoginForm />,
  },

  {
    path: "data",
    element: <EmployeeData />,
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>
);
