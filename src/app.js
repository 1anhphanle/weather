const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index");

const app = express(); // Khởi tạo một instance của ứng dụng Express.js
const port = 3001;

//Thiết lập thư mục public là thư mục chứa các tài nguyên tĩnh (static files) như HTML, CSS, JavaScript, images,...
const pathPublic = path.join(__dirname, "../public"); // tạo đường dẫn tuyệt đối đến thư mục public 
app.use(express.static(pathPublic));

// Sử dụng router cho route chính
app.use("/", indexRouter); // Nối router indexRouter với route chính /. Khi có yêu cầu đến route /, Express.js sẽ chuyển tiếp yêu cầu đó đến indexRouter để xử lý.

app.set("view engine", "hbs"); // Thiết lập Handlebars (hbs) là view engine cho ứng dụng. View engine cho phép render dữ liệu động vào các template HTML.

// Khởi tạo server và listen yêu cầu từ client
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});