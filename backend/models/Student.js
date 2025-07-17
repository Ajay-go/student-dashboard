const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    feesPaid: { type: Boolean, default: false }
});

module.exports = mongoose.model('Student', studentSchema);
