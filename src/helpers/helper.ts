import crypto from "crypto";
import serverData from "../config/config";
import jwt from "jsonwebtoken";

const helpers = {
  random: () => crypto.randomBytes(128).toString("base64"),

  encryptPassword: (salt: string, password: string) => {
    return crypto
      .createHmac("sha256", [salt, password].join("/"))
      .update(serverData.cryptoSecret)
      .digest("hex");
  },

  createJWT: (tcNumber: number) => {
    const token = jwt.sign({ tcNumber }, serverData.jwtSecret, {
      expiresIn: "1h",
    });

    return token;
  },
};

export default helpers;
