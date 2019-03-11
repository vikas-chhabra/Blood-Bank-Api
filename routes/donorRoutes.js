const express = require('express');
const app = express.Router();
const donor = require('../controller/donorController')


app.get('', donor.getAllDonor);
app.get('/bloodInfo',donor.bloodInfo);
app.get('/donorBloodInfo',donor.donorBloodInfo);
app.get('/:donorId', donor.getDonor);
app.post('', donor.saveDonor);
app.put('/:donorId', donor.updateDonor);
app.delete('/:donorId', donor.deleteDonor);

module.exports = app;