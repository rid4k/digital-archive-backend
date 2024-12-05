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

      if (!userId || !name || !surname || !tcNumber) {
        res.status(400).json({ message: "Credentials are missing" });
        return;
      }

      const existingUser = await userServices.getUserById(userId);

      if (!existingUser) {
        res.status(400).json({ message: "User not found" });
        return;
      }

      const updateData: Record<string, any> = {
        name,
        surname,
        tcNumber,
      };

      // Conditionally add the authentication field if password is provided
      if (password) {
        const salt = helpers.random(); // Assuming helpers.random() generates a salt
        updateData.authentication = {
          salt,
          password: helpers.encryptPassword(salt, password), // Encrypt password with salt
        };
      }

      const user = await userServices.updateUserById(userId, updateData);

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },
};

export default users;
