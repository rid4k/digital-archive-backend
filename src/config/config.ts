import dotenv from "dotenv";

dotenv.config();

const serverData = {
  port: process.env.PORT || "8080",
  mongoUrl: process.env.MONGO_URL,
  cryptoSecret: process.env.CRYPTO_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  allowedOrigins: [
    process.env.ADMIN_FRONTEND_URL,
    process.env.USER_FRONTEND_URL,
  ],
  accessKey: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucketRegion: process.env.AWS_REGION,
  bucketName: process.env.S3_BUCKET_NAME,
};

export default serverData;
