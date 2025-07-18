const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });

        const existing = await Student.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = new Student({ name, email, password: hashedPassword });
        await student.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'All fields required' });
        console.log(email);
        console.log(password);
        const student = await Student.findOne({ email });
        console.log(student);
        if (!student) return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = password === student.password;

        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, student: { id: student._id, name: student.name, email: student.email, feesPaid: student.feesPaid } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.userId).select('-password');
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const student = await Student.findByIdAndUpdate(req.userId, { name, email }, { new: true }).select('-password');
        res.json(student);
    } catch {
        res.status(500).json({ message: 'Update failed' });
    }
};

exports.payFees = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.userId, { feesPaid: true }, { new: true }).select('-password');
        res.json(student);
    } catch {
        res.status(500).json({ message: 'Payment failed' });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({}, '-password');
        res.json(students);
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
};
