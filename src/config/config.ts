import dotenv from "dotenv";

dotenv.config();

const serverData = {
  port: process.env.PORT || "8080",
  mongoUrl: process.env.MONGO_URL,
  cryptoSecret: process.env.CRYPTO_SECRET,
  jwtSecret: process.env.JWT_SECRET,
};

export default serverData;
