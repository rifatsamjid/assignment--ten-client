import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthProvider from "./Context/AuthProvider";
import { WatchListProvider } from "./Components/WatchList/WatchListContext.jsx";

const Root = lazy(() => import("./Layout/Root.jsx"));
const Home = lazy(() => import("./Components/Home/Home.jsx"));
const Login = lazy(() => import("./Components/Login/Login.jsx"));
const Register = lazy(() => import("./Components/Register/Register.jsx"));
const AllMovies = lazy(() => import("./Components/AllMovies/AllMovies.jsx"));
const MoviesDetails = lazy(() =>
  import("./Components/MoviesDetails/MoviesDetails.jsx")
);
const MyCollection = lazy(() =>
  import("./Components/MyCollection/MyCollection.jsx")
);
const AddMovies = lazy(() => import("./Components/AddMovies/AddMovies.jsx"));
const WatchList = lazy(() => import("./Components/WatchList/WatchList.jsx"));
const NotFound = lazy(() => import("./Components/NotFound/NotFound.jsx"));

const Loading = () => (
  <div className="flex justify-center items-center h-screen bg-base-200">
    <span className="loading loading-spinner text-primary w-16 h-16"></span>
  </div>
);

const withSuspense = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: "/login", element: withSuspense(Login) },
      { path: "/register", element: withSuspense(Register) },
      {
        path: "/movies",
        element: withSuspense(AllMovies),
        loader: () =>
          fetch("https://assignment-ten-server-wine.vercel.app/movies"),
      },
      {
        path: "/movies/:id",
        element: withSuspense(MoviesDetails),
        loader: async ({ params }) => {
          const res = await fetch(
            `https://assignment-ten-server-wine.vercel.app/movies/${params.id}`
          );
          if (!res.ok) throw new Error("Movie not found");
          return res.json();
        },
      },
      {
        path: "/movies/my-collection",
        element: withSuspense(MyCollection),
        loader: () =>
          fetch("https://assignment-ten-server-wine.vercel.app/movies"),
      },
      { path: "/movies/add", element: withSuspense(AddMovies) },
      { path: "/movies/watch", element: withSuspense(WatchList) },
    ],
  },
  { path: "*", element: withSuspense(NotFound) },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <WatchListProvider>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
      </WatchListProvider>
    </AuthProvider>
  </StrictMode>
);
