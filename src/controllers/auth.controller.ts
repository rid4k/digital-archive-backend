import express from "express";
import userServices from "../services/users.services";
import helpers from "../helpers/helper";

const auth = {
  createUser: async (req: express.Request, res: express.Response) => {
    try {
      const { name, surname, tcNumber, password } = req.body;

      if (!name || !surname || !tcNumber || !password) {
        res.status(400).json({ message: "Credentials are missing" });
        return;
      }

      const existingUser = await userServices.getUserByTcNumber(tcNumber);

      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const salt = helpers.random();

      const user = await userServices.createUser({
        name,
        surname,
        tcNumber,
        authentication: {
          salt,
          password: helpers.encryptPassword(salt, password),
        },
      });

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  createAdmin: async (req: express.Request, res: express.Response) => {
    try {
      const { name, surname, tcNumber, password } = req.body;

      if (!name || !surname || !tcNumber || !password) {
        res.status(400).json({ message: "Credentials are missing" });
        return;
      }

      const existingUser = await userServices.getUserByTcNumber(tcNumber);

      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const salt = helpers.random();

      const user = await userServices.createUser({
        name,
        surname,
        tcNumber,
        userType: "admin",
        authentication: {
          salt,
          password: helpers.encryptPassword(salt, password),
        },
      });

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  login: async (req: express.Request, res: express.Response) => {
    try {
      const { tcNumber, password } = req.body;

      if (!password || !tcNumber) {
        res.status(400).json({ message: "Credentials are missing" });
        return;
      }

      const user = await userServices
        .getUserByTcNumber(tcNumber)
        .select("+authentication.salt +authentication.password");

      if (!user) {
        res.status(400).json({ message: "Wrong credentials" });
        return;
      }

      const expectedPasswdHash = helpers.encryptPassword(
        user.authentication.salt,
        password
      );

      if (user.authentication.password !== expectedPasswdHash) {
        res.status(403).json({ message: "Wrong credentials" });
        return;
      }

      const token = helpers.createJWT(tcNumber);

      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",

        maxAge: 1 * 60 * 60 * 1000, // 1h
      });

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },
};

export default auth;
