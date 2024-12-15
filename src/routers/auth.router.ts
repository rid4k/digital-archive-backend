import express from "express";
import auth from "../controllers/auth.controller";
import { isAuthenticatedAdmin } from "../middlewares/admin.middleware";
import { isAuthenticatedUser } from "../middlewares/lawyer.middleware";

export default (router: express.Router) => {
  router.post("/auth/create-user", isAuthenticatedAdmin, auth.createUser);
  router.post("/auth/login", auth.login);
  router.post("/auth/logout", isAuthenticatedUser, auth.logout);
  router.post("/auth/refresh", auth.handleRefreshToken);
};
