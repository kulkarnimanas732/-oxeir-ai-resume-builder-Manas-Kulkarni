import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employer from "../models/Employer.js";
import dotenv from "dotenv";
dotenv.config();

export const loginEmployer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employer = await Employer.findOne({ email });
    if (!employer) return res.status(400).json({ msg: "Employer not found" });

    const isMatch = await bcrypt.compare(password, employer.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: employer._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

export const registerEmployer = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Employer.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployer = new Employer({
      name,
      email,
      password: hashedPassword,
    });

    await newEmployer.save();

 
    const token = jwt.sign({ id: newEmployer._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ msg: "Employer registered successfully", token });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


