# MovieMaster Pro

**Live Site:** [https://assignment-ten-76e7a.web.app/](https://assignment-ten-76e7a.web.app/)

MovieMaster Pro is a comprehensive movie management system where users can browse, manage, and organize their favorite movies. It features advanced filtering, personalized collections, and a sleek, responsive design for all devices.

---

## Features

- **Browse Movies:** Explore all movies with detailed information including title, genre, rating, release year, cast, and plot summary.
- **User Collections:** Logged-in users can add movies to their personal collection and manage them with edit/delete functionality.
- **Top Rated & Recently Added:** Quickly find top-rated movies and the latest additions in the system.
- **Advanced Filtering:** Filter movies by multiple genres or rating ranges for easy discovery.
- **Watchlist & Favorites:** Add movies to your watchlist and access them on a dedicated page.
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices with an intuitive layout.
- **Authentication:** Secure login and registration using email/password or Google login, with protected routes for private content.
- **Loading & Toast Notifications:** Smooth loading states and informative toast messages for CRUD operations.
- **Theme Toggle:** Switch between light and dark modes to enhance the user experience.
- **Animations & Visuals:** Eye-catching animations using Framer Motion and AOS for a dynamic interface.

---

## Pages & Routes

| Route                  | Description                                   | Protected |
|------------------------|-----------------------------------------------|-----------|
| `/`                    | Home page with hero, top-rated, stats       | No        |
| `/movies`              | All movies listing with filters              | No        |
| `/movies/add`          | Add a new movie                              | Yes       |
| `/movies/my-collection`| User’s personal movie collection             | Yes       |
| `/movies/update/:id`   | Update movie (owner only)                    | Yes       |
| `/movies/:id`          | Movie details page                           | No        |

---

## Tech Stack

- **Frontend:** React, TailwindCSS, Framer Motion, AOS, React Router, React Hot Toast
- **Backend/Hosting:** Firebase (Authentication & Firestore Database)
- **Other Libraries:** React Icons, Lucide React, React Three Fiber, react-tsparticles, Animate.css
- **Deployment:** Hosted on Firebase Hosting

---


