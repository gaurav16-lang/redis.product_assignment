const mongoose = require("mongoose");

const wetherSchema = mongoose.Schema({
    product_name:{type:String,require:true},
    product_number:{type:Number,require:true},
    product_price:{type:Number,require:true},
    product_discount:{type:Number,require:true},
    mrp:{type:Number,require:true}
},{
    versionKey:false,
    timestamps:true,
})


module.exports = mongoose.model("product",wetherSchema);