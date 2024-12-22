import express from "express";
import userServices from "../services/users.services";
import helpers from "../helpers/helper";
import serverData from "../config/config";
import jwt from "jsonwebtoken";

const auth = {
  createUser: async (req: express.Request, res: express.Response) => {
    try {
      const { name, surname, tcNumber, password, userType } = req.body;

      if (!name || !surname || !tcNumber || !password || !userType) {
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
        userType,
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

      const token = helpers.createJWT(tcNumber, user.userType);
      const refreshToken = helpers.createRefreshToken(tcNumber, user.userType);

      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 1 * 60 * 60 * 1000, // 1h
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 24h
      });

      res
        .status(200)
        .json({ message: "Login successful", userType: user.userType });
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  logout: async (req: express.Request, res: express.Response) => {
    try {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  handleRefreshToken: async (req: express.Request, res: express.Response) => {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res.status(403).json({ message: "No refresh token" });
        return;
      }

      const decoded = jwt.verify(
        refreshToken,
        serverData.refreshTokenSecret
      ) as {
        tcNumber: number;
        userType: string;
      };

      if (!decoded) {
        res.status(403).json({ message: "Invalid refresh token" });
        return;
      }

      const { tcNumber, userType } = decoded;

      if (!tcNumber || !userType) {
        res.status(403).json({ message: "Invalid refresh token" });
        return;
      }

      const user = await userServices.getUserByTcNumber(tcNumber);

      if (!user) {
        res.status(403).json({ message: "Invalid refresh token" });
        return;
      }

      const token = helpers.createJWT(user.tcNumber, user.userType);

      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 1 * 60 * 60 * 1000, // 1h
      });

      res.status(200).json({ message: "Token refreshed" });
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },
};

export default auth;
