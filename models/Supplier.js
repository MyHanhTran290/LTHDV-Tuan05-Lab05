const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: String,
    phone: String
});

module.exports = mongoose.model('Supplier', supplierSchema);
