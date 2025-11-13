import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const { logIn, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // handle email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await logIn(email, password);
      const user = userCredential.user;

      // save user to database
      const newUser = {
        name: user.displayName || "No Name",
        email: user.email,
        image: user.photoURL || "",
      };

      fetch("https://assignment-ten-server-wine.vercel.app/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => console.log("User saved:", data));

      toast.success("Login Successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // handle google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;

        const newUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };

        fetch("https://assignment-ten-server-wine.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => console.log("User saved:", data));

        toast.success("Google Login Successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google Login Failed");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <Toaster />
      <div className="bg-base-100 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center justify-center gap-2"
          >
            <img
              src="https://i.ibb.co.com/1tLYCFgN/7611770.png"
              alt="Google logo"
              className="w-6 h-6"
            />
            Login with Google
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <Link to="/register" className="">
            Register
          </Link>
          <span className="text-gray-500 cursor-pointer">Forgot Password?</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
