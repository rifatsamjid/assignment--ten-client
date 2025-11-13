import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Layout/Root.jsx";
import Home from "./Components/Home/Home.jsx";
import AuthProvider from "./Context/AuthProvider"; // তোমার আগের নাম
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import AllMovies from "./Components/AllMovies/AllMovies.jsx";
import MoviesDetails from "./Components/MoviesDetails/MoviesDetails.jsx";
import MyCollection from "./Components/MyCollection/MyCollection.jsx";
import AddMovies from "./Components/AddMovies/AddMovies.jsx";
// import WatchList from "./Components/WatchList/WatchList.jsx";
import { WatchListProvider } from "./Components/WatchList/WatchListContext.jsx";
import WatchList from "./Components/WatchList/WatchList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/movies", element: <AllMovies /> },
      {
        path: "/movies/:id",
        element: <MoviesDetails />,
        loader: ({ params }) =>
          fetch(
            `https://assignment-ten-server-wine.vercel.app/movies/${params.id}`
          ),
      },
      { path: "/movies/my-collection", element: <MyCollection /> },
      { path: "/movies/add", element: <AddMovies /> },
      { path: "/movies/watch", element: <WatchList /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <WatchListProvider>
        <RouterProvider router={router} />
      </WatchListProvider>
    </AuthProvider>
  </StrictMode>
);
