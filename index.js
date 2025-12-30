require("dotenv").config(); 
const express = require("express");4
const cors = require("cors");
//for importing db connection->>
const connectDB=require("./config/db");
const vendorRoutes = require("./routes/vendor");
const productRoutes = require("./routes/product");

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/vendor", vendorRoutes);
app.use("/api/product", productRoutes);




app.get("/",(req,res)=>{
    res.send("INFYLE Vendor Api running");

});


// connect to MONGODB Atlas
connectDB();
const PORT =process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`server runnning on port ${PORT}`)
});
