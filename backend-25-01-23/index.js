// npm init -y
// npm install express mongoose dotenv nodemon 
// npm install crypto-js jsonwebtoken
// npm i bcryptjs cors

const express = require('express');
const app = express();
const mongoose = require('./db');
const userRoutes = require("./router/users");
const productRoutes = require("./router/products");
const orderRoutes = require("./router/orders");
const cors = require('cors');



app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get('/test', (req, res) => { 
 res.status(200).json({greet: "Hola!"})
});




app.listen(process.env.PORT || 4100, () => {
 console.log("Server running on port " + process.env.PORT);
});

