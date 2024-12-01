import express from "express";
import users from "../controllers/users.controller";
import { isAuthenticatedAdmin } from "../middlewares/admin.middleware";

export default (router: express.Router) => {
  router.get("/users/get-users", isAuthenticatedAdmin, users.getUsers);
};
