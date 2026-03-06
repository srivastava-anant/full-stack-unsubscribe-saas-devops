const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    domain: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    top: {
        type: Boolean,
        default: false
    },

    plans: {
        type: [String],
        default: []
    }

});

module.exports = mongoose.model("Service", serviceSchema);
