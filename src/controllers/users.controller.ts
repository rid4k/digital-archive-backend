import express from "express";
import userServices from "../services/users.services";
import helpers from "../helpers/helper";

const users = {
  getUsers: async (req: express.Request, res: express.Response) => {
    try {
      const users = await userServices.getUsers();

      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  getAdmins: async (req: express.Request, res: express.Response) => {
    try {
      const admins = await userServices.getAdmins();

      res.status(200).json(admins);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  deleteAnyUser: async (req: express.Request, res: express.Response) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        res.status(400).json({ message: "Credentials are missing" });
        return;
      }

      const user = await userServices.deleteUserById(userId);

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  updateUser: async (req: express.Request, res: express.Response) => {
    try {
      const { userId, name, surname, tcNumber, password } = req.body;

      if (!userId || !name || !surname || !tcNumber || !password) {
        res.status(400).json({ message: "Credentials are missing" });
        return;
      }

      const existingUser = await userServices.getUserById(userId);

      if (!existingUser) {
        res.status(400).json({ message: "User not found" });
        return;
      }

      const salt = helpers.random();

      const user = await userServices.updateUserById(userId, {
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
};

export default users;
