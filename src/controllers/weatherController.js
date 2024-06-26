const weatherService = require("../services/weatherService");

exports.getWeather = async (req, res) => {
    try {
        const city = req.query.city || "Ho Chi Minh";
        const weatherData = await weatherService.getWeatherData(city);
        res.render("weather", { weather: weatherData });
    } catch (error) {
        console.error("Error fetching weather:", error);
        res.status(500).send("Error fetching weather");
    }
};

// Controller weatherController.js nhận yêu cầu từ router, xử lý logic để lấy dữ liệu thời tiết từ service, và gửi dữ liệu đó đến 
// view để hiển thị cho người dùng. Nó cũng xử lý lỗi trong quá trình lấy dữ liệu và trả về phản hồi lỗi phù hợp cho client.