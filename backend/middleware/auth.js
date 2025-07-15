// // // middleware/auth.js
// // import jwt from "jsonwebtoken";
// // import dotenv from "dotenv";

// // dotenv.config();

// // export const verifyToken = (req, res, next) => {
// //   const token = req.header("Authorization")?.split(" ")[1];
// //   if (!token) return res.status(401).json({ msg: "Unauthorized" });

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded;
// //     next();
// //   } catch (error) {
// //     res.status(400).json({ msg: "Invalid Token" });
// //   }
// // };
// // middleware/auth.js
// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader?.startsWith("Bearer "))
//     return res.status(401).json({ msg: "Unauthorized" });

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;  // contains { id, name, email }
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Invalid token" });
//   }
// };

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
