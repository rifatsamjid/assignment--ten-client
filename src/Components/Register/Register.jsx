import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const { signIn,googleLogin } = useContext(AuthContext); 
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  
  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;
    return hasUppercase && hasLowercase && isLongEnough;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error(
        "Password must contain uppercase, lowercase, and at least 6 characters"
      );
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Registration Successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    googleLogin()
    .then(result=>{
        console.log(result)
    })
    .catch(error=>{
        console.log(error)
    })
    toast("Google Registration coming soon!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <Toaster />
      <div className="bg-base-100 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
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
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Google Register Button with logo */}
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
            Register with Google
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm">
          <span>Already have an account?</span>
          <Link to="/login" className="link link-primary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
