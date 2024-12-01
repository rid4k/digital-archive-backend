import express from "express";
import auth from "./auth.router";
import users from "./users.router";

const router = express.Router();

export default (): express.Router => {
  auth(router);
  users(router);

  return router;
};
