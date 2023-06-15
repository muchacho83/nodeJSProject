const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productsModel")
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get("/products",async(req,res)=>{
    try{
        const products =await( Product.find({}))
        res.status(200).json(products)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

app.get("/products/:id",async(req,res)=>{
    try{
        const {id}=req.params
        const product =await( Product.findById(id))
        res.status(200).json(product)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
app.put('/products/:id',async(req,res)=>{
    try{
        const {id}= req.params
        const product = await Product.findByIdAndUpdate(id,req.body)
        if(!product){
            return res.status(404).json({message:'cannot find the product'})
        }
        const updatedProduct= await Product.findById(id)
        res.status(200).json(updatedProduct)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})
app.delete('/products/:id',async(req,res)=>{
    try{
        const id= req.params.id
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message:'cannot find the product'})
        }
        res.status(200).json(product)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

app.post("/products", async (req,res)=>{
    try{
        const product =await Product.create(req.body)
        res.status(200).json(product)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

mongoose
  .connect(
    "mongodb+srv://20100277:master2001@cluster0.spwo8nb.mongodb.net/Node-Api?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000);
    console.log('connected')
  })
  .catch(() => {
    console.log("err");
  });

app.post("/product", (req, res) => {
  console.log(req.body);
});
