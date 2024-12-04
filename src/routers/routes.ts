import express from "express";
import auth from "./auth.router";
import users from "./users.router";
import application from "./application.router";

const router = express.Router();

export default (): express.Router => {
  auth(router);
  users(router);
  application(router);

  return router;
};
