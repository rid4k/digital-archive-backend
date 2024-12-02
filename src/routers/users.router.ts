import express from "express";
import users from "../controllers/users.controller";
import { isAuthenticatedAdmin } from "../middlewares/admin.middleware";

export default (router: express.Router) => {
  router.get("/users/get-users", isAuthenticatedAdmin, users.getUsers);
  router.get("/users/get-admins", isAuthenticatedAdmin, users.getAdmins);
  router.put("/users/update-user", isAuthenticatedAdmin, users.updateUser);

  router.delete(
    "/users/delete-user",
    isAuthenticatedAdmin,
    users.deleteAnyUser
  );
};
