import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './profile.css';

function Payfees() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    // ✅ Hardcoded backend URL
    const BACKEND_URL = 'https://student-production-13b0.up.railway.app';

    const handlePayment = async () => {
        if (loading) return;
        setLoading(true);
        setError('');
        try {
            if (!token) {
                setError("You must be logged in to pay fees.");
                setLoading(false);
                return;
            }

            await axios.post(`${BACKEND_URL}/api/auth/pay`, {}, {
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
                <button onClick={() => navigate('/profile')} disabled={loading} style={{ marginLeft: '10px' }}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default Payfees;
