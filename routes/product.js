const express = require("express");
const router = express.Router();
// Product model
const Product = require("../models/Product"); 
const auth = require("../middleware/auth"); 
router.post("/add", auth, async (req, res) => {
    try {
      const { name, description, price, category, image } = req.body;
      const product = await Product.create({
        name,
        description,
        price,
        category,
        image,
        vendorId: req.vendor.id, // comes from middleware
        status: "pending"
      });
      res.status(201).json({ message: "Product added", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  // Get all products of a vendor (Protected)
router.get("/vendor/:vendorId",auth,async(req,res)=>{
    try {
        const products=await Product.find({vendorId:req.params.vendorId});
        res.status(200).json(products);

        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
});
// Get all pending products (Admin simulation)
router.get("/pending", async (req, res) => {
    try {
      const products = await Product.find({ status: "pending" });
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
// Approveor Reject product (Admin simulation)

  router.put("/approve/:productId", async (req, res) => {
    try {
      const { status } = req.body; // "approved" or "rejected"
      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
  
      const product = await Product.findByIdAndUpdate(
        req.params.productId,
        { status },
        { new: true }
      );
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: `Product ${status}`, product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  // Get all products (Admin)
router.get("/all", auth, async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({ message: "All products", products });
    } catch (error) {
      console.error("Get Products Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  // Get products by vendor
  router.get("/my", auth, async (req, res) => {
    try {
      const products = await Product.find({ vendorId: req.vendor.id });
      res.status(200).json({ message: "Your products", products });
    } catch (error) {
      console.error("Get Vendor Products Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  // Update product
router.put("/update/:id", auth, async (req, res) => {
    try {
      const { name, description, price, category, image, status } = req.body;
      const product = await Product.findById(req.params.id);
  
      if (!product) return res.status(404).json({ message: "Product not found" });
      if (product.vendorId.toString() !== req.vendor.id)
        return res.status(401).json({ message: "Not authorized" });
  
      // Update fields if provided
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.image = image || product.image;
      product.status = status || product.status;
  
      await product.save();
      res.status(200).json({ message: "Product updated", product });
    } catch (error) {
      console.error("Update Product Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  // Delete product
router.delete("/delete/:id", auth, async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) return res.status(404).json({ message: "Product not found" });
      if (product.vendorId.toString() !== req.vendor.id)
        return res.status(401).json({ message: "Not authorized" });
  
      await product.deleteOne();
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Delete Product Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  // Get vendor profile
router.get("/profile", auth, async (req, res) => {
    try {
      const vendor = await require("../models/Vendor").findById(req.vendor.id).select("-password");
      if (!vendor) return res.status(404).json({ message: "Vendor not found" });
  
      res.status(200).json({ message: "Vendor profile", vendor });
    } catch (error) {
      console.error("Get Vendor Profile Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  

  module.exports = router;