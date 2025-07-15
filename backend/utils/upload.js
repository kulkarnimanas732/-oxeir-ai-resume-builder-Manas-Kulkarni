// // // // // utils/uploadMiddleware.js
// // // // import multer from "multer";
// // // // import path from "path";

// // // // const storage = multer.diskStorage({
// // // //   destination: function (req, file, cb) {
// // // //     cb(null, "uploads/"); // Save resumes to /uploads folder
// // // //   },
// // // //   filename: function (req, file, cb) {
// // // //     const uniqueName = Date.now() + "-" + file.originalname;
// // // //     cb(null, uniqueName);
// // // //   },
// // // // });

// // // // const fileFilter = (req, file, cb) => {
// // // //   if (file.mimetype === "application/pdf") {
// // // //     cb(null, true);
// // // //   } else {
// // // //     cb(new Error("Only PDF files allowed"), false);
// // // //   }
// // // // };

// // // // export const upload = multer({ storage, fileFilter });
// // // // utils/uploadMiddleware.js
// // // import multer from "multer";
// // // import { GridFsStorage } from "multer-gridfs-storage";
// // // import dotenv from "dotenv";
// // // dotenv.config();

// // // const storage = new GridFsStorage({
// // //   url: process.env.MONGO_URI,
// // //   file: (req, file) => {
// // //     if (file.mimetype === "application/pdf") {
// // //       return {
// // //         filename: `${Date.now()}-${file.originalname}`,
// // //         bucketName: "resumes" // stored in MongoDB as fs.resumes
// // //       };
// // //     } else {
// // //       return null;
// // //     }
// // //   }
// // // });

// // // export const upload = multer({ storage });
// // import multer from "multer";
// // import { GridFsStorage } from "multer-gridfs-storage";
// // import dotenv from "dotenv";
// // dotenv.config();

// // const storage = new GridFsStorage({
// //   url: process.env.MONGO_URI,
// //   file: (req, file) => {
// //     return {
// //       filename: `${Date.now()}-${file.originalname}`,
// //       bucketName: "resumes"
// //     };
// //   }
// // });

// // export const upload = multer({ storage });
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // Create 'uploads' directory if it doesn't exist
// const uploadDir = "uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "application/pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF files are allowed"), false);
//   }
// };

// export const upload = multer({ storage, fileFilter });
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Only PDF files are allowed"), false);
};

export const upload = multer({ storage, fileFilter });
