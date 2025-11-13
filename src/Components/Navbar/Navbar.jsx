import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "./../../Context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("User logged out"))
      .catch((err) => console.log(err));
  };

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "night" : "light");
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/movies"
          end
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : ""
          }
        >
          All Movies
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/movies/watch"
          end
          className={({ isActive }) =>
            isActive ? "text-primary font-semibold" : ""
          }
        >
          Watch List
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/movies/my-collection"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : ""
              }
            >
              My Collection
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies/add"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : ""
              }
            >
              Add Movies
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-base-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md px-4 py-2 transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          MovieMaster Pro
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          {navLinks}

          <li>
            {/* Dark/Light mode toggle */}
            <input
              onChange={(e) => handleTheme(e.target.checked)}
              type="Checkbox"
              defaultChecked={localStorage.getItem("theme") === "night"}
              className="toggle"
            />
          </li>

          {user ? (
            <>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-primary btn-sm"
                >
                  Logout
                </button>
              </li>
              <li>
                {/* Avatar with dropdown */}
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-8 rounded-full">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt="user"
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <span className="font-semibold">
                        {user.displayName || "No Name"}
                      </span>
                    </li>
                    <li>
                      <span className="text-sm text-gray-500">
                        {user.email}
                      </span>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="btn btn-outline btn-primary btn-sm"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <ul className="flex z-10 flex-col md:hidden items-center gap-3 mt-2 w-8/12 p-4 bg-base-200 dark:bg-gray-800 rounded-lg shadow absolute right-0 transition-all duration-300">
          {navLinks}

          <li>
            <input
              onChange={(e) => handleTheme(e.target.checked)}
              type="Checkbox"
              defaultChecked={localStorage.getItem("theme") === "night"}
              className="toggle"
            />
          </li>

          {user ? (
            <>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-primary btn-sm"
                >
                  Logout
                </button>
              </li>
              <li className="flex justify-center">
                {/* dropdown mobile */}
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt="user"
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <span className="font-semibold">
                        {user.displayName || "No Name"}
                      </span>
                    </li>
                    <li>
                      <span className="text-sm text-gray-500">
                        {user.email}
                      </span>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="btn btn-outline btn-primary btn-sm"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
