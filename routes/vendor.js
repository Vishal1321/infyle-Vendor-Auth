const express=require("express");
const router=express.Router();
const bcrypt =require("bcryptjs");
const Vendor = require("../models/Vendor"); // model

//signup route
router.post("/signup",async(req,res)=>{

try {
    const{name,email,password,phone}=req.body;
    //validatte the fields
    if(!name || !email || !password || !phone){
        return res.status(400).json({message:"All fields are required"});

    }
    //check if vendor already exists
    const existingVendor =await Vendor.findOne({ email});
    if (existingVendor){
        return res.status(400).json({message:"Vendor already exists"});

    }
    //hashing
    const salt=await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
     //create vendor
     const vendor =await Vendor.create({
        name,
        email,
        password: hashedPassword,
        phone,
        oauthProvider: "Local",
    });
    res.status(201).json({ message: "Vendor registered successfully", vendor });
} catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }});

module.exports = router;

