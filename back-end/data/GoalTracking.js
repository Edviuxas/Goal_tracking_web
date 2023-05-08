const axios = require('axios');

module.exports.getData = async () => {
    const res = await axios.get('https://random-data-api.com/api/v2/users');
    return res.data;
}