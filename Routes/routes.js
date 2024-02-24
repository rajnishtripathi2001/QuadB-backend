const Crypto = require('../Model/Crypto');

exports.get_crypto_data = async (req, res) => {
    const crypto_data = await Crypto.find();

    if (!crypto_data) {
        return res.status(404).json({
            success: false,
            message: "Data not found",
        });
    }
    res.status(200).json({
        success: true,
        data: crypto_data,
    });

};