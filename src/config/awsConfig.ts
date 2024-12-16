import serverData from "./config";
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: serverData.bucketRegion,
  credentials: {
    accessKeyId: serverData.accessKey || "",
    secretAccessKey: serverData.secretAccessKey || "",
  },
});

export default s3Client;
