const axios = require('axios');

const getCoins = async () => {
    try {
        let { data } = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        const crypto_list = data;
        return crypto_list;
    } catch (error) {
        console.log("Error fetching the coins from the api")
    }
}

module.exports = getCoins;