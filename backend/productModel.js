import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : String,
    category : String,
    price : String,
    stock : String
})

const product = mongoose.model('product', productSchema)

export default product