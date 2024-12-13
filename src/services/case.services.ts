import { CaseModel } from "../models/case.model";
import applicationServices from "./application.services";
import userServices from "./users.services";
import jwt from "jsonwebtoken";

const caseServices = {
  getCases: () => CaseModel.find(),

  getCaseById: (id: string) => CaseModel.findById(id),

  createCase: (values: Record<string, any>) =>
    new CaseModel(values).save().then((aCase) => aCase.toObject()),

  deleteCaseById: (id: string) => CaseModel.findOneAndDelete({ _id: id }),

  updateCaseById: (id: string, values: Record<string, any>) =>
    CaseModel.findByIdAndUpdate(id, values),

  getCasesByLawyerId: (lawyerId: string) => CaseModel.find({ lawyerId }),

  getCasesAndApplicationsByLawyerId: async (lawyerId: string) => {
    const cases = await caseServices.getCasesByLawyerId(lawyerId).lean();

    const enrichedCases = await Promise.all(
      cases.map(async (aCase) => {
        const application = await applicationServices.getApplicationById(
          aCase.applicationId
        );

        return {
          ...aCase,
          application,
        };
      })
    );

    return enrichedCases;
  },
};

export default caseServices;
