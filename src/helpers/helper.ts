import crypto from "crypto";
import serverData from "../config/config";
import jwt from "jsonwebtoken";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../config/awsConfig";

const helpers = {
  random: () => crypto.randomBytes(128).toString("base64"),

  encryptPassword: (salt: string, password: string) => {
    return crypto
      .createHmac("sha256", [salt, password].join("/"))
      .update(serverData.cryptoSecret)
      .digest("hex");
  },

  createJWT: (tcNumber: number, userType: string) => {
    const token = jwt.sign({ tcNumber, userType }, serverData.jwtSecret, {
      expiresIn: "1h",
    });

    return token;
  },

  createRefreshToken: (tcNumber: number, userType: string) => {
    const token = jwt.sign(
      { tcNumber, userType },
      serverData.refreshTokenSecret,
      {
        expiresIn: "1d",
      }
    );

    return token;
  },

  generateSignedUrl: async (key: string): Promise<string> => {
    if (!key || key.trim() === "") {
      console.warn("No key provided for generating signed URL.");
      return ""; // Eğer key yoksa boş bir string döndür
    }

    try {
      const command = new GetObjectCommand({
        Bucket: serverData.bucketName, // S3 Bucket adınız
        Key: key,
      });

      // Signed URL oluştur
      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
      });

      return signedUrl || ""; // Eğer signedUrl null veya undefined ise boş string döner
    } catch (error) {
      console.error("Error generating signed URL:", error);
      return ""; // Hata durumunda da boş string döner
    }
  },
};

export default helpers;
