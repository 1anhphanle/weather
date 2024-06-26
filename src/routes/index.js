// 1. Import các module cần thiết
const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");

// 2. Định nghĩa route GET cho đường dẫn '/'
router.get("/", weatherController.getWeather);

// 3. Xuất router để sử dụng ở file khác
module.exports = router;

// File src/routes/index.js định nghĩa route chính / cho ứng dụng. Khi có yêu cầu GET đến /, router 
// sẽ gọi hàm getWeather từ controller weatherController để xử lý logic và trả về kết quả cho client.