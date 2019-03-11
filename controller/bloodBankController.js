const BloodBank = require('../models/BloodBank');

exports.getBloodBankInfo = (req, res) => {
    BloodBank.find()
        .then(bloodBanks => {
            res.status(200).json({
                success: true,
                msg: 'Blood bank info is received',
                bloodBanks
            })
        })
        .catch(error => {
            res.status(200).json({
                success: false,
                msg: 'Error while receiving is receiving',
                error
            });
        })
}

exports.saveBloodBankInfo = (req, res) => {
    let bloodBank = new BloodBank(req.body);
    bloodBank.save()
        .then(_ => {
            res.status(200).json({
                success: true,
                msg: 'Blood bank saved',
            })
        })
        .catch(error => {
            res.status(200).json({
                success: false,
                msg: 'Error while saving blood bank',
                error
            });
        })
}

exports.updateBloodBankInfo = (req, res) => {
    if (!req.params.bloodBankId) {
        res.status(422).json({
            success: false,
            msg: 'Blood bank id is required'
        })
    } else {
        BloodBank.findByIdAndUpdate(req.params.bloodBankId, req.body)
            .then(_ => {
                res.status(200).json({
                    success: true,
                    msg: 'Blood bank updated',
                })
            })
            .catch(error => {
                res.status(200).json({
                    success: false,
                    msg: 'Error while updating blood bank',
                    error
                });
            })
    }
}

exports.deleteBloodBankInfo = (req, res) => {
    if (!req.params.bloodBankId) {
        res.status(422).json({
            success: false,
            msg: 'Blood bank id is required'
        })
    } else {
        BloodBank.findByIdAndDelete(req.params.bloodBankId)
            .then(_ => {
                res.status(200).json({
                    success: true,
                    msg: 'Blood bank deleted',
                })
            })
            .catch(error => {
                res.status(200).json({
                    success: false,
                    msg: 'Error while deleting blood bank',
                    error
                });
            })
    }
}