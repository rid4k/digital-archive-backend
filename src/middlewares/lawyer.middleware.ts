import express from "express";
import userServices from "../services/users.services";
import jwt from "jsonwebtoken";
import serverData from "../config/config";

export const isAuthenticatedUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.cookies["jwt"];

    if (!token) {
      res.status(403).json({ message: "No token provided" });
      return;
    }

    const decoded = jwt.verify(token, serverData.jwtSecret) as {
      tcNumber: number;
      userType: string;
    };

    const { tcNumber, userType } = decoded;

    const existingUser = await userServices.getUserByTcNumber(tcNumber);

    if (!existingUser || (userType !== "lawyer" && userType != "admin")) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.body.user = {
      userId: existingUser._id,
      tcNumber: existingUser.tcNumber,
      userType: existingUser.userType,
    };

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
    return;
  }
};
