'use strict';

const mongoose = require('mongoose'),
    moment = require('moment'),
    Loan = mongoose.model('Loans');

exports.list_all_loans = async (req, res) => {
    try {
        let result;
        result = await Loan
                        .find({})
                        .populate({ path: 'userId' })

        res.status(200).json({
            status: 200,
            message: 'success',
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error,
            data: []
        });
    }
}

exports.list_pending_loans = async (req, res) => {
    try {
        let result;
        result = await Loan
                        .find({ status: true, paid: false })
                        .populate({ path: 'userId' })

        res.status(200).json({
            status: 200,
            message: 'success',
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error,
            data: []
        });
    }
}

exports.list_negated_loans = async (req, res) => {
    try {
        let result;
        result = await Loan
                        .find({status: false})
                        .populate({ path: 'userId' })

        res.status(200).json({
            status: 200,
            message: 'success',
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error,
            data: []
        });
    }
}

exports.list_user_loans = async (req, res) => {
    try {
        let result;
        result = await Loan
                        .find({userId: req.params.userId})
                        .populate({ path: 'userId' })

        res.status(200).json({
            status: 200,
            message: 'success',
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error,
            data: []
        });
    }
}

exports.create_a_loan = async(req, res) => {
        let loans;
        try {
            loans = await Loan
                            .find({userId: req.body.userId})

            const approved = loans.filter(item => {
                return item.status === true && item.paid === true;
            });
            const negated = loans.filter(item => {
                return item.status === false;
            });
            const pending = loans.filter(item => {
                return item.paid === false;
            });
    
            if (!negated.length && !pending.length) {
                req.body.paymentDate = req.body.paymentDate || moment(moment.now()).add(30, 'days').toDate();
                req.body.status = approved.length ? true : Math.random() >= 0.5;
                
                try {
                    let result = await new Loan(req.body).save()
            
                    res.status(200).json({
                        status: 200,
                        message: 'success',
                        data: result
                    });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({
                        status: 500,
                        message: error,
                        data: []
                    });
                }
    
            } else {
                if (!negated.length && pending.length) {
                    res.status(202).json({
                        status: 202,
                        message: 'pending',
                        data: []
                    });
                } else if (negated.length && pending.length) {
                    res.status(203).json({
                        status: 203,
                        message: 'negated',
                        data: []
                    });
                } else {
                    res.status(400).json({
                        status: 400,
                        message: 'no found',
                        data: []
                    });
                }
            }

        } catch (error) {
            console.error(error);
            loans = [];
        }
};

exports.read_a_loan = async (req, res) => {
    try {
        let result;
        result = await Loan
                        .findById(req.params.loanId)
                        .populate({ path: 'userId' })

        res.status(200).json({
            status: 200,
            message: 'success',
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error,
            data: []
        });
    }
}

exports.update_a_loan = async (req, res) => {
    try {
        let result;
        result = await Loan
                        .updateOne({_id: req.params.loanId}, req.body, {new: true})

        res.status(200).json({
            status: 200,
            message: 'success',
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error,
            data: []
        });
    }
}

exports.delete_a_loan = async (req, res) => {
    try {
        let result;
        result = await Loan
                        .deleteOne({_id: req.params.loanId})

        res.status(200).json({
            status: 200,
            message: 'success',
            data: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error,
            data: []
        });
    }
}