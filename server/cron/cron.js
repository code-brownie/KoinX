const cron = require("node-cron");
const crypto = require('../Models/CryptoSchema');
const getCoins = require('../api/FetchCoins');

const updateCryptoList = async () => {
    try {
        const crypto_list = await getCoins();
        const limitedCryptoList = crypto_list.slice(0, 100);
        if (crypto_list.length === 0) throw new Error("No data fetched");

        // Check if a document exists
        const existingCryptoDoc = await crypto.findOne({});
        if (existingCryptoDoc) {
            // Update the existing document with the new list
            await crypto.updateOne({}, { cryptocurrencies: limitedCryptoList });
            console.log("Cryptocurrency list updated successfully.");
        } else {
            // If no document exists, create a new one
            await crypto.create({ cryptocurrencies: limitedCryptoList });
            console.log("New document created with cryptocurrency list.");
        }
    } catch (error) {
        console.error("Error updating cryptocurrency list:", error.message);
    }
}


const scheduleTask = cron.schedule("0 * * * *", async () => {
    updateCryptoList();
}, {
    scheduled: false,
    timezone: "UTC" 
});

module.exports = scheduleTask;