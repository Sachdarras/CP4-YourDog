import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Acceuil from "./pages/Acceuil";
import Loggin from "./pages/Loggin";
import Promenade from "./pages/Promenade";
import Activity from "./pages/Activity";
import DogFriendly from "./pages/Dogfriendly";
import LogginAccount from "./pages/LogginAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Acceuil /> },
      { path: "/loggin", element: <Loggin /> },
      { path: "/promenade", element: <Promenade /> },
      { path: "/dog_friendly", element: <DogFriendly /> },
      { path: "/loggin-account", element: <LogginAccount /> },
      { path: "/activity", element: <Activity /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
