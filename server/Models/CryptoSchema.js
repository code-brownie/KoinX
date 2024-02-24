const mongoose = require('mongoose');

const { Schema } = mongoose;

const CryptoSchema = new Schema({
    cryptocurrencies: [
        {
            _id: false,
            id: { type: String, required: true, unique: true },
            name: { type: String, required: true }
        }
    ]
});

const crypto = mongoose.model("Coins", CryptoSchema);
module.exports = crypto;