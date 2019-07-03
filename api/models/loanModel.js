'use strict';


const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const LoanSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    amount: {
        type: Number,
        required: 'Kindly enter the amount'
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean
    },
    paid: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Loans', LoanSchema);