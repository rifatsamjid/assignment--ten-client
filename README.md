# MovieMaster Pro

**Live Site:** [https://assignment-ten-76e7a.web.app/](https://assignment-ten-76e7a.web.app/)  
**GitHub Repository:** [https://github.com/rifatsamjid/assignment--ten-client](https://github.com/rifatsamjid/assignment--ten-client)

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
- **Animations & Visuals:** Eye-catching animations using Framer Motion, AOS, and Animate.css for a dynamic interface.

---

## Pages & Routes

| Route                  | Description                                   | Protected |
|------------------------|-----------------------------------------------|-----------|
| `/`                    | Home page with hero, top-rated, stats        | No        |
| `/movies`              | All movies listing with filters              | No        |
| `/movies/add`          | Add a new movie                              | Yes       |
| `/movies/my-collection`| User’s personal movie collection             | Yes       |
| `/movies/update/:id`   | Update movie (owner only)                    | Yes       |
| `/movies/:id`          | Movie details page                           | No        |

---

## Tech Stack & Dependencies

- **Frontend:** React, TailwindCSS, Framer Motion, AOS, React Router, React Hot Toast
- **Backend/Hosting:** Firebase (Authentication & Firestore Database)
- **Other Libraries:** React Icons, Lucide React, React Three Fiber, react-tsparticles, Animate.css
- **Deployment:** Firebase Hosting

**Dependencies:**

```json
{
  "@react-three/fiber": "^9.4.0",
  "@tailwindcss/vite": "^4.1.17",
  "animate.css": "^4.1.1",
  "aos": "^2.3.4",
  "firebase": "^12.5.0",
  "framer-motion": "^12.23.24",
  "lucide-react": "^0.553.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-hot-toast": "^2.6.0",
  "react-icons": "^5.5.0",
  "react-router": "^7.9.5",
  "react-tsparticles": "^2.12.2",
  "tailwindcss": "^4.1.17",
  "three": "^0.181.1"
}
```
---

## Installation

Follow these steps to set up and run **MovieMaster Pro** locally on your machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn or pnpm
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/rifatsamjid/assignment--ten-client.git
   cd assignment--ten-client

### Install dependencies

   npm install
# or
yarn install
# or
pnpm install

### Run the development server

npm run dev
# or
yarn dev
# or
pnpm dev