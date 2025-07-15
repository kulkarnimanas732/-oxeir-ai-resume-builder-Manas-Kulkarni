// // utils/pdfParser.js
// import { Readable } from "stream";
// import pdf from "pdf-parse";

// export const extractTextFromPDFBuffer = async (buffer) => {
//   try {
//     const data = await pdf(buffer);
//     return data.text;
//   } catch (err) {
//     throw new Error("Error parsing PDF");
//   }
// };
import { Readable } from "stream";
import { MongoClient, GridFSBucket } from "mongodb";


export const extractTextFromGridFS = async (filename) => {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    const db = client.db(); // Use default DB from URI
    const bucket = new GridFSBucket(db, { bucketName: "resumes" });

    const downloadStream = bucket.openDownloadStreamByName(filename);
    const chunks = [];

    return await new Promise((resolve, reject) => {
      downloadStream.on("data", (chunk) => chunks.push(chunk));
      downloadStream.on("end", async () => {
        const buffer = Buffer.concat(chunks);
        const data = await pdf(buffer);
        resolve(data.text);
      });
      downloadStream.on("error", (err) => reject(err));
    });
  } catch (err) {
    throw new Error("Error reading resume from GridFS");
  } finally {
    await client.close();
  }
};
