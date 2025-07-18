import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './allstudents.css';

// Use env variable or fallback localhost URL
const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function AllStudents() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/auth/students`)
            .then(response => {
                setStudents(response.data);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to load students.');
            });
    }, []);

    return (
        <div className="students-container">
            <h2>All Students</h2>
            {error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="student-list">
                    {students.map(student => (
                        <div key={student._id} className="student-card">
                            <p><strong>Name:</strong> {student.name}</p>
                            <p><strong>Email:</strong> {student.email}</p>
                            <p><strong>Fees Paid:</strong> {student.feesPaid ? 'Yes' : 'No'}</p>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={() => navigate('/')}>Back</button>
        </div>
    );
}

export default AllStudents;
