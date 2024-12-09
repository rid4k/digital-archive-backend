import dotenv from "dotenv";

dotenv.config();

const serverData = {
  port: process.env.PORT || "8080",
  mongoUrl: process.env.MONGO_URL,
  cryptoSecret: process.env.CRYPTO_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  adminFrontendUrl: process.env.ADMIN_FRONTEND_URL,
  userFrontendUrl: process.env.USER_FRONTEND_URL,
};

export default serverData;
