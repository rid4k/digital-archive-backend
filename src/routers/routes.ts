import express from "express";
import auth from "./auth.router";
import users from "./users.router";
import application from "./application.router";
import cases from "./case.router";
import categories from "./categories.router";

const router = express.Router();

export default (): express.Router => {
  auth(router);
  users(router);
  application(router);
  cases(router);
  categories(router);

  return router;
};
