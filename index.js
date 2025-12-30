const express = require("express");4
const cors = require("cors");
require("dotenv").config();
//for importing db connection->>
const connectDB=require("./config/db");
const vendorRoutes = require("./routes/vendor");


const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/vendor", vendorRoutes);



app.get("/",(req,res)=>{
    res.send("INFYLE Vendor Api running");

});

// connect to MONGODB Atlas
connectDB();
const PORT =process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`server runnning on port ${PORT}`)
});
