// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import Employer from "../models/auth.js";
// import Applicant from "../models/applicantAuth.js"; // make sure this exists

// import dotenv from "dotenv";
// dotenv.config();

// export const loginEmployer = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const employer = await Employer.findOne({ email });
//     if (!employer) return res.status(400).json({ msg: "Employer not found" });

//     const isMatch = await bcrypt.compare(password, employer.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

//     // ✅ Include name and email in token payload
//     const token = jwt.sign(
//       { id: employer._id, name: employer.name, email: employer.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error", error: err.message });
//   }
// };
// export const registerEmployer = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     if (!name || !email || !password) {
//       return res.status(400).json({ msg: "All fields are required" });
//     }

//     const existing = await Employer.findOne({ email });
//     if (existing) return res.status(400).json({ msg: "Email already in use" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newEmployer = new Employer({ name, email, password: hashedPassword });
//     await newEmployer.save();

//     // ✅ Include name and email in token payload
//     const token = jwt.sign(
//       { id: newEmployer._id, name: newEmployer.name, email: newEmployer.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(201).json({ msg: "Employer registered successfully", token });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// };


// export const loginApplicant = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const applicant = await Applicant.findOne({ email });
//     if (!applicant) return res.status(400).json({ msg: "Applicant not found" });

//     const isMatch = await bcrypt.compare(password, applicant.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

//     const token = jwt.sign(
//       { id: applicant._id, name: applicant.name, email: applicant.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error", error: err.message });
//   }
// };

// export const registerApplicant = async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     if (!name || !email || !password) {
//       return res.status(400).json({ msg: "All fields are required" });
//     }

//     const existing = await Applicant.findOne({ email });
//     if (existing) return res.status(400).json({ msg: "Email already in use" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newApplicant = new Applicant({ name, email, password: hashedPassword });
//     await newApplicant.save();

//     const token = jwt.sign(
//       { id: newApplicant._id, name: newApplicant.name, email: newApplicant.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.status(201).json({ msg: "Applicant registered successfully", token });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// };

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Employer from "../models/auth.js"; // Employer model
import ApplicantAuth from "../models/applicantAuth.js"; // For applicant login/register only

import dotenv from "dotenv";
dotenv.config();

// --------------------- EMPLOYER LOGIN ---------------------
export const loginEmployer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const employer = await Employer.findOne({ email });
    if (!employer) return res.status(400).json({ msg: "Employer not found" });

    const isMatch = await bcrypt.compare(password, employer.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: employer._id, name: employer.name, email: employer.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// --------------------- EMPLOYER REGISTER ---------------------
export const registerEmployer = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existing = await Employer.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployer = new Employer({ name, email, password: hashedPassword });
    await newEmployer.save();

    const token = jwt.sign(
      { id: newEmployer._id, name: newEmployer.name, email: newEmployer.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ msg: "Employer registered successfully", token });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// --------------------- APPLICANT LOGIN ---------------------
export const loginApplicant = async (req, res) => {
  const { email, password } = req.body;

  try {
    const applicant = await ApplicantAuth.findOne({ email });
    if (!applicant) return res.status(400).json({ msg: "Applicant not found" });

    const isMatch = await bcrypt.compare(password, applicant.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: applicant._id, name: applicant.name, email: applicant.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

// --------------------- APPLICANT REGISTER ---------------------
export const registerApplicant = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existing = await ApplicantAuth.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newApplicant = new ApplicantAuth({
      name,
      email,
      password: hashedPassword
    });

    await newApplicant.save();

    const token = jwt.sign(
      { id: newApplicant._id, name: newApplicant.name, email: newApplicant.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ msg: "Applicant registered successfully", token });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
