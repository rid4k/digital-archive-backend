import { CaseModel } from "../models/case.model";

const caseServices = {
  getCases: () => CaseModel.find(),

  getCaseById: (id: string) => CaseModel.findById(id),

  createCase: (values: Record<string, any>) =>
    new CaseModel(values).save().then((aCase) => aCase.toObject()),

  deleteCaseById: (id: string) => CaseModel.findOneAndDelete({ _id: id }),

  updateCaseById: (id: string, values: Record<string, any>) =>
    CaseModel.findByIdAndUpdate(id, values),
};

export default caseServices;
