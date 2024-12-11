import express from "express";
import caseServices from "../services/case.services";
import applicationServices from "../services/application.services";
import userServices from "../services/users.services";
import { CaseInterface } from "../models/case.model";

const cases = {
  getCases: async (req: express.Request, res: express.Response) => {
    try {
      const cases = await caseServices.getCases();

      res.status(200).json(cases);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  getCaseById: async (req: express.Request, res: express.Response) => {
    try {
      const { caseId } = req.body;

      if (!caseId) {
        res.status(400).json({ error: "Required data not found" });
        return;
      }

      const aCase = await caseServices.getCaseById(caseId);

      if (!aCase) {
        res.status(404).json({ error: "Case not found" });
        return;
      }

      res.status(200).json(aCase);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  createCase: async (req: express.Request, res: express.Response) => {
    try {
      const { applicationId, lawyerId } = req.body;

      if (!applicationId || !lawyerId) {
        res.status(400).json({ error: "Required data not found" });
        return;
      }

      const existLawyer = await userServices.getUserById(lawyerId);

      if (!existLawyer) {
        res.status(404).json({ error: "Lawyer not found" });
        return;
      }

      const existsApplication = await applicationServices.getApplicationById(
        applicationId
      );

      if (!existsApplication) {
        res.status(404).json({ error: "Application not found" });
        return;
      }

      const aCase = await caseServices.createCase({ applicationId, lawyerId });

      if (!aCase) {
        res.status(400).json({ error: "Case could not be created" });
        return;
      }

      const updatedApplication =
        await applicationServices.updateApplicationById(applicationId, {
          status: "approved",
        });

      if (!updatedApplication) {
        res.status(400).json({ error: "Application could not be updated" });
        return;
      }

      res.status(200).json(aCase);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  deleteCaseById: async (req: express.Request, res: express.Response) => {
    try {
      const { caseId } = req.body;

      if (!caseId) {
        res.status(400).json({ error: "Required data not found" });
        return;
      }

      const deletedCase = await caseServices.deleteCaseById(caseId);

      if (!deletedCase) {
        res.status(404).json({ error: "Case not found" });
        return;
      }

      const updatedApplication =
        await applicationServices.updateApplicationById(
          deletedCase.applicationId,
          { status: "pending" }
        );

      if (!updatedApplication) {
        res.status(400).json({ error: "Application could not be updated" });
        return;
      }

      res.status(200).json(deletedCase);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  updateCaseById: async (req: express.Request, res: express.Response) => {
    try {
      const { caseId } = req.body;
      const caseData: CaseInterface = req.body;

      if (!caseId || !caseData) {
        res.status(400).json({ error: "Required data not found" });
        return;
      }

      const updatedCase = await caseServices.updateCaseById(caseId, caseData);

      if (!updatedCase) {
        res.status(404).json({ error: "Case not found" });
        return;
      }

      res.status(200).json(updatedCase);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  getCasesByLawyerId: async (req: express.Request, res: express.Response) => {
    try {
      const user = req.body.user;

      const lawyer = await userServices.getUserByTcNumber(user.tcNumber);

      if (!lawyer) {
        res.status(404).json({ error: "Lawyer not found" });
        return;
      }

      const lawyerId = lawyer.id;

      if (!lawyerId) {
        res.status(400).json({ error: "Required data not found" });
        return;
      }

      const enrichedCases =
        await caseServices.getCasesAndApplicationsByLawyerId(lawyerId);

      res.status(200).json(enrichedCases);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },
};

export default cases;
