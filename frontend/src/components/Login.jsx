import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';
import "./Login.css";
import SocialLoginButtons from "./SocialLoginButton";



const handleLogin = async (email, password) => {
    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.success) {
            // Redirect to dashboard on successful login
            return data; // Return the data for further handling in the component
        } else {
            // Handle error (show message)
            alert("Login failed. Please check your credentials.");
            return null;
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert("An error occurred. Please try again.");
    }
};

function Login() {
    const navigate = useNavigate(); // Hook to programmatically navigate
    const [isActive, setIsActive] = useState(false);
    const [currentField, setCurrentField] = useState(0);

    // State variables for signup fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [regNo, setRegNo] = useState('');
    const [branch, setBranch] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [year, setYear] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);

    // Toggle between Login and Register forms
    const handleRegisterClick = (e) => {
        e.preventDefault();
        setIsActive(true);
        setCurrentField(0);
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        setIsActive(false);
    };

    const handleScroll = (direction) => {
        if (direction === 'next' && currentField < 4) {
            setCurrentField(currentField + 1);
        } else if (direction === 'prev' && currentField > 0) {
            setCurrentField(currentField - 1);
        }
    };

    // Handle signup form submission
    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data
        const formData = {
            email: email,
            password: password,
            name: name,
            regNo: regNo,
            number: contactNumber,
            branch: branch,
            year: year,
        };

        if (profilePicture) {
            formData.profilePicture = profilePicture;
        }

        // Send signup request
        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Make sure the content type is set to application/json
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success) {
                // Redirect to the dashboard on successful signup
                navigate('/dashboard'); // Redirect to the dashboard
            } else {
                alert("Signup failed. Please try again.");
            }
        } catch (error) {
            console.error('Error signing up:', error);
            alert("An error occurred. Please try again.");
        }
    };

    // const HandleGoogleAuth = async (e)=>{
 
    //     window.location.href = 'http://localhost:3000/auth/google';
    // }

    // const HandleGitAuth = async (e)=>{
    //     // 
    //     window.location.href = 'http://localhost:3000/auth/github';
    // }
    // const HandleFacebookAuth = async (e)=>{
    //     window.location.href = 'http://localhost:3000/auth/facebook';
    // }

    // Handle Login Form Submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const data = await handleLogin(email, password);
        if (data && data.success) {
            // On successful login, redirect to the dashboard
            navigate('/dashboard');
        }
    };

    return (
        <div className={`container ${isActive ? "active" : ""}`}>
            <div className="curved-shape"></div>
            <div className="curved-shape2"></div>

            {/* Login Form */}
            <div className={`form-box Login ${isActive ? "hidden" : ""}`}>
                <h2 className="animation" style={{ "--D": 0 }}>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div className="input-box animation" style={{ "--D": 1 }}>
                        <input
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="input-box animation" style={{ "--D": 2 }}>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Password</label>
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <div className="input-box animation" style={{ "--D": 3 }}>
                        <button className="btn" type="submit">Login</button>
                    </div>
                    <div className={`${isActive ? "hidden" : ""}`}><SocialLoginButtons/></div>
                    <div className="regi-link animation" style={{ "--D": 4 }}>
                        <p>
                            Don't Have an account? <a href="#" onClick={handleRegisterClick}>Sign Up</a>
                        </p>
                    </div>
                </form>
            </div>

            {/* Register Form */}
            <div className={`form-box Register ${isActive ? "" : "hidden"}`}>
                <h2 className="animation" style={{ "--li": 17 }}>Register</h2>
                <form onSubmit={handleSignupSubmit}>
                    <div className="input-box animation">
                        <input
                            type="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                    </div>
                    <div className="input-box animation">
                        <input
                            type="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Password</label>
                    </div>
                    <div className="input-box animation">
                        <input
                            type="text"
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>Name</label>
                    </div>
                    <div className="input-box animation">
                        <input
                            type="text"
                            name="regNo"
                            required
                            value={regNo}
                            onChange={(e) => setRegNo(e.target.value)}
                        />
                        <label>Registration Number</label>
                    </div>
                    <div className="input-box animation">
                        <input
                            type="text"
                            name="branch"
                            required
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                        />
                        <label>Branch</label>
                    </div>
                    <div className="input-box animation">
                        <input
                            type="text"
                            name="number"
                            required
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                        <label>Contact Number</label>
                    </div>
                    <div className="input-box animation">
                        <input
                            type="text"
                            name="year"
                            required
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                        <label>Year</label>
                    </div>

                    {/* Submit Button */}
                    <div className="input-box animation">
                        <button className="btn" type="submit">Register</button>
                    </div>

                    {/* Social Sign-In Buttons */}
                    {/* <div className="social-buttons">
                        <button className="social-btn google-btn" onClick={HandleGoogleAuth}>Sign in with Google</button>
                        <button className="social-btn github-btn" onClick= {HandleGitAuth}>Sign in with GitHub</button>
                        <button className="social-btn facebook-btn" onClick = {HandleFacebookAuth}>Sign in with Facebook</button>
                    </div> */}
                    <div className={`${isActive ? "" : "hidden"}`}><SocialLoginButtons/></div>

                    {/* Link to switch to Login */}
                    <div className="regi-link animation">
                        <p>Existing User? <a href="#" onClick={handleLoginClick}>Sign In</a></p>
                    </div>
                </form>
            </div>


            {/* Info Section for Login */}
            {!isActive && (
                <div className="info-content Login">
                    <h2 className="animation" style={{ "--D": 0 }}>WELCOME BACK!</h2>
                    <p className="animation" style={{ "--D": 1 }}>
                        "The future depends on what you do today!"
                    </p>
                </div>
            )}

            {/* Info Section for Register */}
            {isActive && (
                <div className="info-content Register">
                    <h2 className="animation" style={{ "--li": 17 }}>HELLO THERE!</h2>
                    <p className="animation" style={{ "--li": 18 }}>
                        “Embark on Your Journey to Success; Sign Up and Soar to New Heights!”
                    </p>
                </div>
            )}
        </div>
    );
}

export default Login;
