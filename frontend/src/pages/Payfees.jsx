import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './profile.css'; 

function Payfees() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const handlePayment = async () => {
        setLoading(true);
        setError('');
        try {
            if (!token) {
                setError("You must be logged in to pay fees.");
                setLoading(false);
                return;
            }

            await axios.post('http://localhost:4000/api/auth/pay', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Fees payment successful!");
            navigate('/profile');
        } catch (err) {
            console.error(err);
            setError("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="profile-box">
                <h2>Pay Fees</h2>
                <p>Please confirm your payment to proceed.</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button onClick={handlePayment} disabled={loading}>
                    {loading ? "Processing..." : "Pay Now"}
                </button>
            </div>
        </div>
    );
}

export default Payfees;
