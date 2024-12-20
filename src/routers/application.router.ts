import express from "express";
import application from "../controllers/application.controller";
import { isAuthenticatedAdmin } from "../middlewares/admin.middleware";
import { uploadFilesMiddleware } from "../middlewares/uploadMiddleware";
import multer from "multer";
import serverData from "../config/config";

const upload = multer(); // Use memory storage

export default (router: express.Router) => {
  router.post(
    "/applications/create",
    upload.array("files", 5),
    uploadFilesMiddleware(serverData.bucketName || ""),
    application.createApplication
  );
  router.get(
    "/applications/get-applications",
    isAuthenticatedAdmin,
    application.getApplications
  );

  router.get(
    "/applications/get-pending-applications",
    isAuthenticatedAdmin,
    application.getPendingApplications
  );

  router.get(
    "/applications/get-approved-applications",
    isAuthenticatedAdmin,
    application.getApprovedApplications
  );

  router.get(
    "/applications/get-rejected-applications",
    isAuthenticatedAdmin,
    application.getRejectedApplications
  );

  router.get(
    "/applications/get-individual-applications",
    isAuthenticatedAdmin,
    application.getIndividualApplications
  );

  router.get(
    "/applications/get-institutional-applications",
    isAuthenticatedAdmin,
    application.getInstitutionalApplications
  );

  router.get(
    "/applications/get-application-by-id",
    isAuthenticatedAdmin,
    application.getApplicationById
  );

  router.delete(
    "/applications/delete-application",
    isAuthenticatedAdmin,
    application.deleteApplication
  );

  router.put(
    "/applications/update-application",
    isAuthenticatedAdmin,
    application.updateApplication
  );

  router.put(
    "/applications/update-application-status",
    isAuthenticatedAdmin,
    application.updateApplicationStatus
  );
};
