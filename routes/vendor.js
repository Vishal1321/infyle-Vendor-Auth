const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Vendor = require("../models/Vendor");

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // validate
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check existing vendor
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Vendor already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create vendor
    const vendor = await Vendor.create({
      name,
      email,
      password: hashedPassword,
      phone,
      oauthProvider: "local" // ⚠️ must match enum in schema
    });

    res.status(201).json({
      message: "Vendor registered successfully",
      vendor
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existingVendor = await Vendor.findOne({ email });
    if (!existingVendor) {
      return res.status(400).json({ message: "Vendor not found" });
    }

    const isMatch = await bcrypt.compare(password, existingVendor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: existingVendor._id,
        email: existingVendor.email
      },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      vendor: {
        id: existingVendor._id,
        name: existingVendor.name,
        email: existingVendor.email,
        phone: existingVendor.phone
      },
      token
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/me", auth, async (req, res) => {
    try {
      const vendor = await Vendor.findById(req.vendor.id).select("-password");
      res.json({ vendor });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
