import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const Profile = () => {
    const [student, setStudent] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const BACKEND_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get(`${BACKEND_URL}/api/auth/profile`, {  
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setStudent(res.data);
                setName(res.data.name);
                setEmail(res.data.email);
            })
            .catch(() => {
                navigate('/login');
            });
    }, [token, navigate, BACKEND_URL]);

    const updateProfile = async () => {
        try {
            const res = await axios.put(`${BACKEND_URL}/api/auth/profile`, { name, email }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStudent(res.data);
            alert('Profile updated successfully');
        } catch {
            alert('Failed to update profile');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handlePayFees = () => {
        navigate('/payfees');
    };

    if (!student) return <div className="page-container">Loading...</div>;

    return (
        <div className="page-container">
            <div className="profile-box">
                <h2>Profile</h2>

                <label>Name</label>
                <input value={name} onChange={e => setName(e.target.value)} />

                <label>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} />

                <button onClick={updateProfile}>Update Profile</button>

                <h3>Fees Paid: {student.feesPaid ? 'Yes' : 'No'}</h3>

                {!student.feesPaid && (
                    <button onClick={handlePayFees}>Pay Fees</button>
                )}
            </div>

            <div className="button-group">
                <button onClick={() => navigate('/')}>Back</button>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
        </div>
    );
};

export default Profile;
