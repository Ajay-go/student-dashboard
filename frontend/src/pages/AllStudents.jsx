import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './allstudents.css';

const BACKEND_URL = import.meta.env.VITE_API_URL;

function AllStudents() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/auth/students`)
            .then(response => {
                setStudents(response.data);
                setError('');
            })
            .catch(err => {
                console.error(err);
                setError('Failed to load students.');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="students-container">
            <h2>All Students</h2>

            {loading && <p>Loading students...</p>}

            {error && <div className="error">{error}</div>}

            {!loading && !error && students.length === 0 && (
                <p>No students found.</p>
            )}

            {!loading && !error && students.length > 0 && (
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

            <button className="back-button" onClick={() => navigate('/')}>Back</button>
        </div>
    );
}

export default AllStudents;
