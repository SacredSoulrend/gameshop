import axios from 'axios';
require('dotenv').config();
const apiKey = config.RAWG_API_KEY;

const search = async (query) =>
axios.get(`https://rawg.io/api/games?token&key=${apiKey}`);

export default {search};
