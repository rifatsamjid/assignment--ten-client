import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Layout/Root.jsx";
import Home from "./Components/Home/Home.jsx";
import AuthProvider from "./Context/AuthProvider";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import AllMovies from "./Components/AllMovies/AllMovies.jsx";
import MoviesDetails from "./Components/MoviesDetails/MoviesDetails.jsx";
import MyCollection from "./Components/MyCollection/MyCollection.jsx";
import AddMovies from "./Components/AddMovies/AddMovies.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/movies",
        element: <AllMovies />,
      },
      {
        path: "/movies/:id",
        element: <MoviesDetails />,
        loader: ({ params }) =>
          fetch(
            `https://assignment-ten-server-wine.vercel.app/movies/${params.id}`
          ),
      },
      {
        path: "/movies/my-collection",
        element: <MyCollection />,
      },
      {
        path: "/movies/add",
        element: <AddMovies />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
