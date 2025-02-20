const mongoose = require('mongoose');
const tokenSchema = mongoose.Schema({ // generating token schema
    userId: {
        type: mongoose.Schema.Types.ObjectId, // foriegn reference to user collection
        required: true,
        ref: "User",
        unique: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires:3600
    }
});
module.exports = tokenSchema // exporting the token schema