const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exists = await Student.findOne({ email });
        if (exists) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = new Student({ name, email, password: hashedPassword });
        await newStudent.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const student = await Student.findOne({ email });
        if (!student) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).select('-password');
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    const { name, email } = req.body;

    try {
        const student = await Student.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true }
        ).select('-password');

        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.payFees = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.user.id,
            { feesPaid: true },
            { new: true }
        ).select('-password');

        res.json({ message: "Fees paid successfully", student });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().select('-password');
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
