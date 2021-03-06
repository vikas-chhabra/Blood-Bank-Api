const express = require('express');
const app = express.Router();
const bloodBankController = require('../controller/bloodBankController');

app.get('', bloodBankController.getAllBloodBankInfo);
app.get('/filter/:state', bloodBankController.getBloodBankFilter);
app.get('/:bloodBankId', bloodBankController.getBloodBankInfo);
app.post('', bloodBankController.saveBloodBankInfo);
app.put('/:bloodBankId', bloodBankController.updateBloodBankInfo);
app.delete('/:bloodBankId', bloodBankController.deleteBloodBankInfo);

module.exports = app;