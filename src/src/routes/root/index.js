import { createBrowserRouter } from "react-router-dom";
import { List } from "../../pages";
import { Add } from "../../pages/add";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <List />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/edit/:userId",
    element: <Add />,
  }
]);
