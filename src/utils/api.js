const asyncRequest = require("async-request");

const access_key = "c7689b1612ef22cbf2ca7d8228a937fc";

exports.getWeather = async (location) => {
    const response = await asyncRequest(
        `http://api.weatherstack.com/current?access_key=${access_key}&query=${location}`
    );
    return JSON.parse(response.body);
};