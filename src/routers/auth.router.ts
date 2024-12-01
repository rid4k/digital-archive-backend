import express from "express";
import auth from "../controllers/auth.controller";
import { isAuthenticatedAdmin } from "../middlewares/admin.middleware";

export default (router: express.Router) => {
  router.post("/auth/create-user", isAuthenticatedAdmin, auth.createUser);
  router.post("/auth/login", auth.login);
};
