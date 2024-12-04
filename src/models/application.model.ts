import mongoose from "mongoose";

export interface ApplicationInterface {
  applicantTc: number;
  applicantName: string;
  applicantSurname: string;
  applicantPhone: number;
  applicantEmail: string;
  applicantType: string;
  applicationReason: string;
  applicationType: string;
  companyName: string;
  companyType: string;
  status: string;
  files: [
    {
      fileKey: string;
      description: string;
    }
  ];
  resources: [
    {
      url: string;
    }
  ];
}

const ApplicationSchema = new mongoose.Schema(
  {
    applicantTc: { type: Number, required: true },
    applicantName: { type: String, required: true },
    applicantSurname: { type: String, required: true },
    applicantPhone: { type: Number, required: true },
    applicantEmail: { type: String, required: true },
    applicantType: { type: String, required: true },
    applicationReason: { type: String, required: true },
    applicationType: { type: String, required: true },
    companyName: { type: String, default: "" },
    companyType: { type: String, default: "" },
    status: { type: String, default: "pending" },
    files: {
      type: [
        {
          fileKey: { type: String },
          description: { type: String },
        },
      ],
      default: [],
    },
    resources: {
      type: [
        {
          url: { type: String },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const ApplicationModel = mongoose.model(
  "Application",
  ApplicationSchema
);
