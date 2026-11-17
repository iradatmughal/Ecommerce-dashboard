import mongoose from "mongoose";

const connectDB = async ()=>{
    await mongoose.connect('mongodb://localhost:27017/Owner')
    console.log('Data Base is working')
}


export default connectDB