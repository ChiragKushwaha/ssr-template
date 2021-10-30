import HomePage from "./pages/HomePage";
import UsersListPage from "./pages/UsersListPage";
import NotFoundPage from "./pages/NotFoundPage";
import App from "./App";
import AdminsListPage from "./pages/AdminsListPage";

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: "/",
        exact: true,
      },
      {
        ...UsersListPage,
        path: "/users",
        exact: true,
      },
      {
        ...AdminsListPage,
        path: "/admins",
        exact: true,
      },
      {
        ...NotFoundPage,
        path: "",
      },
    ],
  },
];
