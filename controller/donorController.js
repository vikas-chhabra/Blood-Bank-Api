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

exports.bloodInfo = (req, res) => {
    let aPositive = 0,
        aNegative = 0,
        bPositive = 0,
        bNegative = 0,
        oPositive = 0,
        oNegative = 0,
        abPositive = 0,
        abNegative = 0;
    var lastUpdated;
    Donor.findOne({}, {}, {
        sort: {
            'created_at': -1
        }
    }).then(donor => {
        let currentDate = new Date();
        lastUpdated = currentDate - donor.updatedAt.getHours();
    })
    Donor.find()
        .then(donor => {
            donor.forEach(v => {
                switch (v.bloodGroup) {
                    case 'A+':
                        aPositive++
                        break;
                    case 'A-':
                        aNegative++
                        break;
                    case 'B+':
                        bPositive++
                        break;
                    case 'B-':
                        bNegative++
                        break;
                    case 'O+':
                        oPositive++
                        break;
                    case 'O-':
                        oNegative++
                        break;
                    case 'AB+':
                        abPositive++
                        break;
                    case 'AB-':
                        abNegative++
                        break;

                    default:
                        break;
                }
            });
            res.status(200).json({
                success: true,
                msg: 'Blood info received',
                totalDonors: donor.length,
                aPositive,
                aNegative,
                bPositive,
                bNegative,
                oPositive,
                oNegative,
                abPositive,
                abNegative,
                lastUpdated
            });
        })
        .catch(error => {
            res.status(422).json({
                success: false,
                msg: 'Error while receiving blood info',
                error
            })
        });
}

exports.donorBloodInfo = (req, res) => {
    let aPositive = [],
        aNegative = [],
        bPositive = [],
        bNegative = [],
        oPositive = [],
        oNegative = [],
        abPositive = [],
        abNegative = [];
    Donor.find()
        .then(donor => {
            donor.forEach(v => {
                switch (v.bloodGroup) {
                    case 'A+':
                        aPositive.push(v);
                        break;
                    case 'A-':
                        aNegative.push(v);
                        break;
                    case 'B+':
                        bPositive.push(v);
                        break;
                    case 'B-':
                        bNegative.push(v);
                        break;
                    case 'O+':
                        oPositive.push(v);
                        break;
                    case 'O-':
                        oNegative.push(v);
                        break;
                    case 'AB+':
                        abPositive.push(v);
                        break;
                    case 'AB-':
                        abNegative.push(v);
                        break;

                    default:
                        break;
                }
            });

            res.status(200).json({
                success: true,
                msg: 'Donor blood info received',
                aPositive,
                aNegative,
                bPositive,
                bNegative,
                oPositive,
                oNegative,
                abPositive,
                abNegative
            });
        })
        .catch(error => {
            res.status(422).json({
                success: false,
                msg: 'Error while receiving donor blood info',
                error
            })
        })
}