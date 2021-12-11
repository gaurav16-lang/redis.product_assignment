
const express = require("express");

const redis = require("../config/redis");

const router = express.Router();

const Product = require("../models/product.model");

router.get("",(req,res)=>{

    redis.get("products",async function(err,forecasts){

         console.log("forcast",forecasts);
if(err) console.log(err)

if(forecasts)return res.status(200).send({catched:JSON.parse(forecasts)})


const products = await  Product.find().lean().exec();


redis.set("products",JSON.stringify(products))

return res.status(200).send({dbforecast:products});
    })
    
})

router.post("",async function(req,res){
    const products = await Product.create(req.body)
    
    
    
    const productst = await Product.find().lean().exec();

    redis.set("products",JSON.stringify(productst));
    return res.status(201).send(products);
})


router.get("/:id",(req,res)=>{
    redis.get(`products.${req.params.id}`,  async function(err,forecast){


    if(err) console.log(err);

    if(forecast) return res.status(200).send({catched_forecast:JSON.parse(forecast)})

    const products = await Product.findById(req.params.id).lean().exec()

    redis.set(`products.${req.params.id}`,JSON.stringify(products));

    return res.status(200).send({dbforecast:products})

})
})

router.patch("/:id",async(req,res)=>{
    const products = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});

     redis.set(`products.${req.params.id}`,JSON.stringify(products));

     const productst = await Product.find().lean().exec();

     redis.set("products",JSON.stringify(productst))

     return res.status(201).send(products);

})

router.delete("/:id",async(req,res)=>{
    const products  = await Product.findByIdAndDelete(req.params.id);
    redis.del(`products.${req.params.id}`);
    const productst = await  Product.find().lean().exec();

    redis.set("products",JSON.stringify(productst));
    return res.status(200).send(products);
})
module.exports = router;