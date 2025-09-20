const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); // load biến môi trường từ .env

const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');
const { swaggerUi, swaggerSpec } = require("./swagger");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_STR)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB error:', err));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/suppliers", supplierRoutes);
app.use("/products", productRoutes);

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại ${process.env.BASE_URI}:${PORT}`);
});
