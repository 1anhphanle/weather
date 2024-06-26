const api = require("../utils/api");

exports.getWeatherData = async (location) => {
    try {
        const data = await api.getWeather(location);
        // Xử lý dữ liệu từ API ở đây
        const weather = {
            isSuccess: true,
            region: data.location.region,
            country: data.location.country,
            temperature: data.current.temperature,
            wind_speed: data.current.wind_speed,
            precip: data.current.precip,
            cloudcover: data.current.cloudcover,
        };
        return weather;
    } catch (err) {
        console.log("Error: ", err);
        return {
            isSuccess: false,
            err,
        };
    }
};