const mongoose = require('mongoose');

const bloodBankSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    state: {
        type: String,
        required: [true, 'State is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    contactNo: {
        type: String,
        required: [true, 'Contact no. is required']
    },
    noOfDonors: {
        type: String,
        required: [true, 'Number of donors is required']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BloodBank', bloodBankSchema);