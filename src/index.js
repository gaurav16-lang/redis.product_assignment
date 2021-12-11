const express = require("express");
const app = express();
app.use(express.json())


const product_controller = require("./controllers/product.controller");


app.use("/product",product_controller);




module.exports=app;