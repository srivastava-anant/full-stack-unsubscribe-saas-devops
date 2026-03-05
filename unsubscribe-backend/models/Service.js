const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: String,
    domain: String,
    link: String,
    top: { type: Boolean, default: false },
    plans: [String]
});

module.exports = mongoose.model("Service", serviceSchema);

