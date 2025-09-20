const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require("express-session");
const cookieParser = require('cookie-parser');
require('dotenv').config(); // load biến môi trường từ .env

const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require("./routes/auth");
const { swaggerUi, swaggerSpec } = require("./swagger");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_STR)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB error:', err));

// Session middleware
app.use(
  session({
    secret: "mySecretKey", // Đặt secret vào .env trong thực tế
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 giờ
    },
  })
);
// Middleware parse body & cookie
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", authRoutes);

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại ${process.env.BASE_URI}:${PORT}`);
});
