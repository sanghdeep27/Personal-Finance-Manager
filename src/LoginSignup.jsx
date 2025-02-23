import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Dashboard from './Dashboard.jsx'; 
const LoginSignup = () => {
    


    const [isSignUp, setIsSignUp] = useState(false);

    const handleToggle = () => {
        setIsSignUp((prev) => !prev);
    };

    const handleSignUp = () => {
        setTimeout(() => {
            setIsSignUp(false);
        }, 500);
    };

    const handleSignIn = () => {
        window.location.href = "dashboard";
    };

    return (
        <div className={`container ${isSignUp ? "active" : ""}`} id="container">
            {/* Sign In Form */}
            <div className="form-container" id="signInForm">
                <h1 className="floating">Personal Finance Manager</h1>
                <h3 className="floating">Login</h3>
                <input type="email" placeholder="Email" className="input-field" />
                <input type="password" placeholder="Password" className="input-field" />
                <a href="#" className="forgot-password">Forgot your password?</a>
                <button className="btn" id="signInBtn" onClick={handleSignIn}>Sign In</button>
            </div>

            {/* Sign Up Form */}
            <div className="form-container" id="signUpForm">
                <h3 className="floating">Create Account</h3>
                <input type="text" placeholder="Full Name" className="input-field" />
                <input type="email" placeholder="Email" className="input-field" />
                <input type="password" placeholder="Password" className="input-field" />
                <button className="btn" id="signUpBtn" onClick={handleSignUp}>Sign Up</button>
            </div>

            {/* Toggle Panel */}
            <div className="toggle-container">
                <div className="toggle-content">
                    <h2 id="toggle-text" className="floating">
                        {isSignUp ? "Hello, Friend!" : "Welcome Back!"}
                    </h2>
                    <p id="toggle-description" className="floating">
                        {isSignUp
                            ? "Enter your personal details and start your journey with us"
                            : "To keep connected with us, please login with your personal info"}
                    </p>
                    <button className="toggle-btn" id="toggle-btn" onClick={handleToggle}>
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                </div>
            </div>
        </div>
    );
};




export default LoginSignup;
