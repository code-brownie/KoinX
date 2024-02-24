const axios = require('axios');

const PriceData = async (coinName, date) => {
    try {
        const Price = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinName}/history`, {
            params: {
                date: date,
                localization: false,
            }
        });
        return Price.data;
    } catch (error) {
        console.log(error);
    }
}
module.exports = PriceData;