const mongoose =require("mongoose");

//vendor schema
const vendorSchema =new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
},
oauthProvider:{
    type:String,
    enum:["Local","Google"],
    default:"Local"
},
phone:{
    type:String,
    required:true,
},
    },
    {timestamps:true}//automatically adds createAt & updateAt
);
module.exports =mongoose.model("Vendors",vendorSchema)