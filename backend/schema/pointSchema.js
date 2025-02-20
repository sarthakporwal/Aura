const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({ // creating the pointSchema
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    category: {
        type: String, 
        default: "Iron 1"
    },
    sectional: {
        type: Map,
        of: String
    }
});
module.exports = pointSchema; // export pointSchema