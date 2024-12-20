import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../config/awsConfig";
import { v4 as uuidv4 } from "uuid";
import express from "express";

const storage = multer.memoryStorage();

const upload = multer({ storage });

const uploadToS3 = async (file: Express.Multer.File, bucketName: string) => {
  const fileKey = `uploads/${uuidv4()}_${file.originalname}`;

  const uploadParams = {
    Bucket: bucketName,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  await s3Client.send(new PutObjectCommand(uploadParams));

  return fileKey;
};

export const uploadFilesMiddleware =
  (bucketName: string) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return next();
      }

      const uploadedFiles = await Promise.all(
        files.map((file) => uploadToS3(file, bucketName))
      );

      console.log("Uploaded Files:", uploadedFiles);
      req.body.uploadedFiles = uploadedFiles;
      next();
    } catch (error) {
      console.error("S3 Upload Error:", error);
      res.status(500).json({ message: "Error uploading files" });
    }
  };

export default upload;
