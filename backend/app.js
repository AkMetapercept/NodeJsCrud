const express=require("express")
const Product =require("./modules/productModule")

const mongoose=require("mongoose")

const app=express()

app.use(express.json());

app.listen(3000, () => {
    console.log("Server Listening on PORT:", 3000);
  });


  //Routes

  app.get("/g",(req,res) =>{

    const status={
        "status":"running"
    }
    res.send(status)
  });


  //Get Routes

  app.get("/get",async (req,res)=>{

    try {
      const product=await Product.find()
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({messege:error.messege})
      
    }
  })


  //Post Routes
app.post("/post",async(req,res)=>{

  try{
    const product =await Product.create(req.body)
    res.status(200).json(product);
  }
  catch (error){

    console.log(error.messege);
    res.status(500).json({messege:error.messege})
  }

 
  res.send(res.body)
})



  //GetBy Single Id

  app.get("/getById/:id",async (req,res)=>{
    try {
      const {id}=req.params
      const productById=await Product.findById(id)
      res.status(200).json(productById)
    } catch (error) {

      res.status(500).json({messege:error.messege})
    }

  })


  //Update Routes
  
  app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
  
    try {
      const newProduct = await Product.findByIdAndUpdate(id, { name, quantity }, { new: true });
      res.status(200).json(newProduct);
    } catch (error) {
      res.status(500).json({messege:error.messege})
    }
  });


//Delete Routes

app.delete("/delete/:id",async(req,res)=>{

const {id}=req.params
try {
  
  const deleteProduct=await Product.findByIdAndDelete(id)
  res.status(200).json(deleteProduct)
} catch (error) {
  
  res.status(500).json({messege:error.messege})
}

})







mongoose.connect(`mongodb+srv://akshayrp:root@cluster.ar9cvdc.mongodb.net/`)
.then(()=>{
  console.log("Conncetd...");
}).catch((error)=>{
  console.log(error);
})
