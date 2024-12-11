import express from "express";
import cases from "../controllers/case.controller";
import { isAuthenticatedAdmin } from "../middlewares/admin.middleware";
import { isAuthenticatedUser } from "../middlewares/lawyer.middleware";

export default (router: express.Router) => {
  router.get("/cases/get-cases", isAuthenticatedAdmin, cases.getCases);
  router.get("/cases/get-case", isAuthenticatedAdmin, cases.getCaseById);
  router.post("/cases/create-case", isAuthenticatedAdmin, cases.createCase);
  router.delete(
    "/cases/delete-case",
    isAuthenticatedAdmin,
    cases.deleteCaseById
  );
  router.put("/cases/update-case", isAuthenticatedAdmin, cases.updateCaseById);
  router.get(
    "/cases/get-cases-by-lawyer-id",
    isAuthenticatedUser,
    cases.getCasesByLawyerId
  );
};
