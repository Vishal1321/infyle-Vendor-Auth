const { default: mongoose } = require("mongoose");
const moongoose =require("mongoose");
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB connected");
    } catch (error) {
        console.error("MongoDB failed:", error.message);
        process.exit(1);//exip app if error occured
        
    }
};

module.exports=connectDB;