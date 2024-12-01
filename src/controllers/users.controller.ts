import express from "express";
import userServices from "../services/users.services";

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
};

export default users;
