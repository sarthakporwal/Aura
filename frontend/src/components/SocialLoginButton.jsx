import React from 'react';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';

const SocialLoginButtons = () => {
    const handleGoogleLogin = () => {
        // Handle Google login logic here
        window.location.href = 'http://localhost:3000/auth/google';
    };

    const handleGithubLogin = () => {
        // Handle GitHub login logic here
        window.location.href = 'http://localhost:3000/auth/github';
    };

    const handleLinkedInLogin = () => {
        // Handle LinkedIn login logic here
        window.location.href = 'http://localhost:3000/auth/facebook';
    };

    return (
        <div className="social-buttons">
            <button className="social-btn google-btn" onClick={handleGoogleLogin}>
                <FaGoogle /> 
            </button>

            <button className="social-btn github-btn" onClick={handleGithubLogin}>
                <FaGithub /> 
            </button>

            <button className="social-btn linkedin-btn" onClick={handleLinkedInLogin}>
                <FaFacebook /> 
            </button>
        </div>
    );
};

export default SocialLoginButtons;