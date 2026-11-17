import express from "express";
import cors from "cors";
import user from "./userModel.js";
import product from './productModel.js'
import connectDB from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// sign code
app.post('/sign' ,async (req,res)=>{
  const {name,email,password} = req.body
  const excit = await user.findOne({email})
  if (excit) {
    return res.json({msg : 'user already excist',succes : false})
  }
  await user.create({name,email,password})
  return res.json({msg : 'sign succesfull',succes : true})
})

// login code
app.post('/logn',async (req,res)=>{
  const {email,password} = req.body
  const combin = await user.findOne({email})
  if (!combin) {
    return res.json({msg : 'Somethin went wrong',succes : false})
  }

  if (combin.password !== password) {
    return res.json({msg : 'Somthing went wrong',succes : false})
  }

  return res.json({msg : 'login succesfull',succes : true})
})

// product code
app.post('/addProduct',async (req,res)=>{
  const {title,category,price,stock} = req.body
  await product.create({title,category,price,stock})
  return res.json({msg : 'Product save successfull'})
})

// product send
app.get('/productSend',async (req,res)=>{
  const allProduct = await product.find()
  return res.send(allProduct)
})

// Edit product
app.post('/editProduct',async (req,res)=>{
  const {title,category, price,stock,_id} = req.body
 await product.findByIdAndUpdate(_id,{title,category, price,stock})
  return res.send('Update successfull')
})

// delete product
app.post('/deleteProduct',async (req,res)=>{
  const {_id} = req.body
  await product.findByIdAndDelete(_id)
  return res.send('Delete Successfull')
})

app.listen(4000, () => {
  console.log("server is runing on http://localhost:4000/");
});
