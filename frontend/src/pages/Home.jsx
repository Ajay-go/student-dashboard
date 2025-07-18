import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    return (
        <div className="home-container">
            <nav className="navbar">
                <button onClick={() => navigate('/allstudents')}>
                    All Students
                </button>

                {token ? (
                    <button onClick={() => navigate('/profile')}>
                        Profile
                    </button>
                ) : (
                    <button onClick={() => navigate('/login')}>
                        Login
                    </button>
                )}
            </nav>

            <div className="home-content">
                <h1>Welcome to the Student Fee Management System</h1>
                <p>{token ? "You're logged in." : "Please login to access your profile."}</p>
            </div>
        </div>
    );
};

export default Home;
