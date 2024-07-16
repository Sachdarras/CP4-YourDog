import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Acceuil from "./pages/Acceuil";
import Loggin from "./pages/Loggin";

import Activity from "./pages/Activity";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Acceuil /> },
      { path: "/loggin", element: <Loggin /> },

      { path: "/activity", element: <Activity /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
