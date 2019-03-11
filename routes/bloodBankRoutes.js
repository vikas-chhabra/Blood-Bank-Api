const express = require('express');
const app = express.Router();
const bloodBankController = require('../controller/bloodBankController');

app.get('', bloodBankController.getBloodBankInfo);
app.post('', bloodBankController.saveBloodBankInfo);
app.put('/:bloodBankId', bloodBankController.updateBloodBankInfo);
app.delete('/:bloodBankId', bloodBankController.deleteBloodBankInfo);

module.exports = app;