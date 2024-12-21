import express from "express";
import cases from "../controllers/case.controller";
import { isAuthenticatedAdmin } from "../middlewares/admin.middleware";
import { isAuthenticatedUser } from "../middlewares/lawyer.middleware";
import { uploadFilesMiddleware } from "../middlewares/uploadMiddleware";
import multer from "multer";
import serverData from "../config/config";

const upload = multer(); // Use memory storage

export default (router: express.Router) => {
  router.get("/cases/get-cases", isAuthenticatedAdmin, cases.getCases);
  router.get("/cases/get-case", isAuthenticatedAdmin, cases.getCaseById);
  router.post("/cases/create-case", isAuthenticatedAdmin, cases.createCase);
  router.delete(
    "/cases/delete-case",
    isAuthenticatedAdmin,
    cases.deleteCaseById
  );
  router.put(
    "/cases/update-case",
    upload.array("files", 5),
    isAuthenticatedUser,
    uploadFilesMiddleware(serverData.bucketName || ""),
    cases.updateCaseById
  );
  router.get(
    "/cases/get-cases-by-lawyer-id",
    isAuthenticatedUser,
    cases.getCasesByLawyerId
  );
};
