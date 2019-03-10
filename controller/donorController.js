const Donor = require('../models/Donor')

exports.saveDonor = (req, res) => {
    const donor = new Donor(req.body);
    donor.save()
        .then(_ => {
            res.status(201).json({
                success: true,
                msg: 'Donor saved'
            });
        })
        .catch(error => {
            res.status(422).json({
                success: false,
                msg: 'Error while saving Donor',
                error
            });
        })
}

exports.getAllDonor = (req, res) => {
    Donor.find()
        .then(donors => {
            res.status(200).json({
                    success: true,
                    msg: 'Donors received',
                    donors
                })
                .catch(error => {
                    res.status(422).json({
                        success: false,
                        msg: 'Error while receiving Donor',
                        error
                    });
                })
        })
}

exports.getDonor = (req, res) => {
    Donor.findById(req.params.donorId)
        .then(donor => {
            res.status(200).json({
                success: true,
                msg: 'Donor received',
                donor
            });
        })
        .catch(error => {
            res.status(422).json({
                success: false,
                msg: 'Error while receiving Donor',
                error
            });
        });
}

exports.updateDonor = (req, res) => {
    if (!req.params.donorId) {
        return res.status(422).json({
            success: false,
            msg: 'Donor id required',
        })
    } else {
        Donor.findByIdAndUpdate(req.params.donorId, req.body)
            .then(_ => {
                res.status(200).json({
                    success: true,
                    msg: 'Donor updated'
                });
            })
            .catch(error => {
                res.status(422).json({
                    success: false,
                    msg: 'Error while updating donor',
                    error
                })
            })

    }
}

exports.deleteDonor = (req, res) => {
    if (!req.params.donorId) {
        return res.status(422).json({
            success: false,
            msg: 'Donor id required',
        })
    } else {
        Donor.findByIdAndDelete(req.params.donorId)
            .then(_ => {
                res.status(200).json({
                    success: true,
                    msg: 'Donor deleted'
                })
            })
            .catch(error => {
                res.status(422).json({
                    success: false,
                    msg: 'Error while deleting donor',
                    error
                })

            })
    }
}