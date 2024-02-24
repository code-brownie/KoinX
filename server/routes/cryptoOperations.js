const express = require('express');
const router = express.Router();
const getCoins = require('../api/FetchCoins');
const PriceData = require('../api/PriceData');
const crypto = require('../Models/CryptoSchema');
const getCompanyName = require('../api/CompanyData');

// Api :--> Save to the db the list of the cryptocurrencies
//Task 1
router.get('/GetCoins', async (req, res) => {
    try {
        // Fetching the coins from the coinGeko api
        const crypto_list = await getCoins();

        if (crypto_list.length == 0) throw new Error("No data fetched");

        // limiting the array size to hundred
        const limitedCryptoList = crypto_list.slice(0, 100);

        // Saving to the database
        const ifCoinsExist = await crypto.find({});
        if (ifCoinsExist.length == 0)
            await crypto.create({ cryptocurrencies: limitedCryptoList });

        return res.json({ success: true, message: "coins fetched successfully", coins: limitedCryptoList });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, error });
    }
})

// Api :--> Price of currency on  a specific date

// Task 2
router.post('/GetCoinPrice', async (req, res) => {
    try {
        const { coinName, toCurrency, date } = req.body;
        if (!coinName || !toCurrency || !date) {
            return res.status(400).send({ msg: 'Missing parameters' })
        }

        const price = await PriceData(coinName, date);
        const targetPrice = price.market_data.current_price[toCurrency];
        return res.json({ success: true, coinName: coinName, targetCurrency: toCurrency, targetPrice: targetPrice });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: error.message });
    }

})

// Task 3
router.post('/company_list', async (req, res) => {
    try {
        const { currency } = req.body;
        if (!currency) return res.status(400).send('Please provide a valid Crypto Name');
        const companyList = await getCompanyName(currency);
        if (!companyList) return res.status(404).send('Companies Not found');
        return res.status(200).json({ success: true, companyList: companyList });
    } catch (error) {
        return res.status(500).json({ success: false, err: error.message });
    }

})

module.exports = router;