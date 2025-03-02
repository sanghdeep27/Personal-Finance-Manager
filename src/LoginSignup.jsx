import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const API_URL = "http://localhost:5000"; // Change if backend is hosted

const LoginSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Toggle between Sign In and Sign Up
  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
    setError(""); // Clear errors when toggling
  };

  // Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("Attempting login with:", { email, password });
    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem("token", response.data.token); // Save token in local storage
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      await axios.post(`${API_URL}/register`, { fullName, email, password });
      setIsSignUp(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Sign-up failed");
    }
  };

  return (
    <div className={`container ${isSignUp ? "active" : ""}`} id="container">
      {/* Sign In Form */}
      <div className="form-container" id="signInForm">
        <h1 className="floating">Personal Finance Manager</h1>
        <h3 className="floating">Login</h3>
        {error && !isSignUp && <p className="error-message">{error}</p>}
        <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
        <a href="#" className="forgot-password">Forgot your password?</a>
        <button className="btn" id="signInBtn" onClick={handleSignIn}>Sign In</button>
      </div>

      {/* Sign Up Form */}
      <div className="form-container" id="signUpForm">
        <h3 className="floating">Create Account</h3>
        {error && isSignUp && <p className="error-message">{error}</p>}
        <input type="text" placeholder="Full Name" className="input-field" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn" id="signUpBtn" onClick={handleSignUp}>Sign Up</button>
      </div>

      {/* Toggle Panel */}
      <div className="toggle-container">
        <div className="toggle-content">
          <h2 id="toggle-text" className="floating">{isSignUp ? "Hello, Friend!" : "Welcome Back!"}</h2>
          <p id="toggle-description" className="floating">
            {isSignUp ? "Enter your personal details and start your journey with us" : "To keep connected with us, please login with your personal info"}
          </p>
          <button className="toggle-btn" id="toggle-btn" onClick={handleToggle}>{isSignUp ? "Sign In" : "Sign Up"}</button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
