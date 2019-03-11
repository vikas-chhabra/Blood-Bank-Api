const mongoose = require('mongoose');

const donorSchema = mongoose.Schema({
    donorName: {
        type: String,
        required: [true, 'Donor name is required']
    },
    mobile: {
        type: Number,
        required: [true, 'Mobile number is required']
    },
    anotherMobile: Number,
    bloodGroup: {
        type: String,
        required: [true, 'Blood group is required']
    },
    dob: {
        type: String,
        required: [true, 'Date of Birth is required']
    },
    address: String,
    occupation: String,
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    disease: {
        type: String,
        default: "none"
    },
    lastTimeDonate: {
        type: String
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Donor', donorSchema);