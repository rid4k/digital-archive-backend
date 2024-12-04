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
    applicationId: { type: Number, required: true },
    lppName: { type: String },
    lppSurname: { type: String },
    lppTc: { type: Number },
    lawyerId: { type: String, required: true },
    caseSubject: { type: String },
    caseNumber: { type: Number },
    courtName: { type: String },
    indictment: { type: String },
    files: [
      {
        fileKey: { type: String },
        description: { type: String },
      },
    ],
    resources: [
      {
        url: { type: String },
      },
    ],
    result: { type: String },
    resultPhase: { type: String },
  },
  {
    timestamps: true,
  }
);

export const CaseModel = mongoose.model("Case", CaseSchema);
