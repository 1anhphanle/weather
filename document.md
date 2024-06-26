## Hướng dẫn dự án Weather App (Node.js, Express.js, Weatherstack API)

### Giới thiệu

Dự án này là một ứng dụng web đơn giản cho phép người dùng xem thông tin thời tiết của một thành phố bất kỳ. Ứng dụng được xây dựng với Node.js, sử dụng framework Express.js và API Weatherstack để lấy dữ liệu thời tiết.

### Cấu trúc thư mục

```
weather-app/
├── src/                   # Chứa code nguồn của ứng dụng
│   ├── app.js            # File khởi tạo ứng dụng Express.js
│   ├── routes/           # Chứa các file định nghĩa routes
│   │   └── index.js     # File định nghĩa route chính ('/')
│   ├── controllers/      # Chứa các file xử lý logic cho từng route
│   │   └── weatherController.js # File xử lý logic cho route thời tiết
│   ├── services/         # Chứa các file xử lý logic nghiệp vụ
│   │   └── weatherService.js # File xử lý gọi API thời tiết
│   ├── utils/            # Chứa các hàm tiện ích chung
│   │   └── api.js       # File xử lý gọi API Weatherstack
│   └── config/           # Chứa các file cấu hình (ví dụ: API key)
│       └── index.js      # File cấu hình chung cho ứng dụng
├── views/                 # Chứa các file template (ví dụ: Handlebars)
│   └── weather.hbs       # File template hiển thị dữ liệu thời tiết
└── public/                # Chứa các file static (CSS, JS, images)
    └── css/
        └── style.css      # File CSS tùy chỉnh (nếu có)
```

### Chi tiết từng file

#### 1. `src/app.js`: 
- Khởi tạo ứng dụng Express.js
- Định nghĩa port cho server
- Thiết lập thư mục `public` cho các file static
- Sử dụng router `indexRouter` cho route chính (`/`)
- Thiết lập view engine là Handlebars
- Khởi động server và lắng nghe kết nối

```javascript
const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index"); 

const app = express();
const port = 3001;

const pathPublic = path.join(__dirname, "../public"); 
app.use(express.static(pathPublic));

app.use("/", indexRouter); 

app.set("view engine", "hbs");

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
```

#### 2. `src/routes/index.js`:
- Định nghĩa route GET cho đường dẫn `/`
- Gọi hàm `getWeather` từ controller `weatherController` để xử lý yêu cầu

```javascript
const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");

router.get("/", weatherController.getWeather);

module.exports = router;
```

#### 3. `src/controllers/weatherController.js`:
- Xử lý logic cho route thời tiết
- Gọi service `weatherService` để lấy dữ liệu thời tiết
- Render view `weather.hbs` và truyền dữ liệu thời tiết vào
- Xử lý lỗi nếu có

```javascript
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
```

#### 4. `src/services/weatherService.js`:
- Gọi API Weatherstack để lấy dữ liệu thời tiết thô
- Xử lý, format dữ liệu thô thành dạng dễ sử dụng hơn
- Xử lý lỗi trong quá trình gọi API

```javascript
const api = require("../utils/api");

exports.getWeatherData = async (location) => {
  try {
    const data = await api.getWeather(location);

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
```

#### 5. `src/utils/api.js`:
- Chứa hàm tiện ích để gọi API Weatherstack

```javascript
const asyncRequest = require("async-request");

const access_key = "YOUR_API_KEY"; // Thay bằng API key của bạn

exports.getWeather = async (location) => {
  const response = await asyncRequest(
    `http://api.weatherstack.com/current?access_key=${access_key}&query=${location}`
  );
  return JSON.parse(response.body);
};
```

#### 6. `views/weather.hbs`:
- File template Handlebars hiển thị dữ liệu thời tiết

```html
<!DOCTYPE html>
<html>
<head>
  <title>Weather App</title>
</head>
<body>
  <h1>Weather App</h1>

  <form action="/" method="GET">
    <label for="city">Enter city:</label>
    <input type="text" id="city" name="city" value="{{#if weather.region}}{{weather.region}}{{else}}Ho Chi Minh{{/if}}">
    <button type="submit">Get Weather</button>
  </form>

  {{#if weather.isSuccess}}
    <h2>Weather in {{weather.region}}, {{weather.country}}</h2>
    <p>Temperature: {{weather.temperature}}°C</p>
    <p>Wind Speed: {{weather.wind_speed}} m/s</p>
    <p>Precipitation: {{weather.precip}} mm</p>
    <p>Cloud Cover: {{weather.cloudcover}}%</p>
  {{else}}
    <p>Error: {{weather.err.message}}</p>
  {{/if}}
</body>
</html>
```

#### 7. `public/css/style.css`:
- File CSS tùy chỉnh (nếu có)

### Hướng dẫn chạy dự án

1. Cài đặt Node.js và npm.
2. Clone repository này về máy.
3. Chạy `npm install` để cài đặt các dependencies.
4. Tạo file `src/config/index.js` và thêm API key của bạn:

```javascript
module.exports = {
  apiKey: "YOUR_API_KEY",
};
```

5. Chạy `node src/app.js` để khởi động server.
6. Truy cập `http://localhost:3001/` trên trình duyệt để sử dụng ứng dụng.

### Lưu ý
- Thay thế `YOUR_API_KEY` bằng API key của bạn từ Weatherstack.
- Bạn có thể tuỳ chỉnh giao diện và hiển thị thêm dữ liệu thời tiết trong file `views/weather.hbs`.
- Nên sử dụng `eslint` hoặc các công cụ lint khác để đảm bảo code tuân thủ theo một chuẩn chung.
