const axios = require('axios');

const getCompanyName = async (currency) => {
    try {
        const company = await axios.get(`https://api.coingecko.com/api/v3/companies/public_treasury/${currency}`);
        return company.data.companies;
    } catch (error) {

    }

}
module.exports = getCompanyName;