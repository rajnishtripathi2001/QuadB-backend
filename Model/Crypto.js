const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: String,
    last: Number,
    buy: Number,
    sell: Number,
    volume: Number,
    base_unit: String
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;