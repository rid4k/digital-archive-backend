import mongoose from "mongoose";

export interface CaseInterface {
  applicationId: number;
  lppName: string;
  lppSurname: string;
  lppTc: number;
  lawyerId: string;
  caseSubject: string;
  caseNumber: number;
  courtName: string;
  indictment: string;
  files: {
    fileKey: string;
    description: string;
  }[];
  resources: {
    url: string;
  }[];
  result: string;
  resultPhase: string;
}

const CaseSchema = new mongoose.Schema(
  {
    applicationId: { type: String, required: true },
    lppName: { type: String, default: "" },
    lppSurname: { type: String, default: "" },
    lppTc: { type: Number, default: 0 },
    lawyerId: { type: String, required: true },
    caseSubject: { type: String, default: "" },
    caseNumber: { type: Number, default: 0 },
    courtName: { type: String, default: "" },
    indictment: { type: String, default: "" },
    files: { type: [{ fileKey: String, description: String }], default: [] },
    resources: { type: [{ url: String }], default: [] },
    result: { type: String, default: "" },
    resultPhase: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const CaseModel = mongoose.model("Case", CaseSchema);
