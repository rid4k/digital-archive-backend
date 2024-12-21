import helpers from "../helpers/helper";
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
    CaseModel.findByIdAndUpdate(id, values, { new: true }),

  getCasesByLawyerId: (lawyerId: string) => CaseModel.find({ lawyerId }),

  getCasesAndApplicationsByLawyerId: async (lawyerId: string) => {
    const cases = await caseServices.getCasesByLawyerId(lawyerId).lean();

    const signedCases = await Promise.all(
      cases.map(async (aCase) => {
        const filesWithSignedUrls = Array.isArray(aCase.files)
          ? await Promise.all(
              aCase.files.map(async (file) => ({
                _id: file._id,
                fileKey: file.fileKey,
                description: file.description,
                signedUrl: file.fileKey
                  ? await helpers.generateSignedUrl(file.fileKey)
                  : "",
              }))
            )
          : [];

        // Güncellenmiş files'ı application nesnesine ekleyin
        return {
          ...aCase, // Eğer Mongoose modeli ise düz objeye çevirin
          files: filesWithSignedUrls, // Sadece dosyaları güncelle
        };
      })
    );

    const enrichedCases = await Promise.all(
      signedCases.map(async (aCase) => {
        const application = await applicationServices.getApplicationById(
          aCase.applicationId
        );

        const filesWithSignedUrls = await Promise.all(
          application.files.map(async (file) => ({
            _id: file._id,
            fileKey: file.fileKey,
            description: file.description,
            signedUrl: file.fileKey
              ? await helpers.generateSignedUrl(file.fileKey)
              : "",
          }))
        );

        const signedApplication = {
          ...application.toObject(), // Eğer Mongoose modeli ise düz objeye çevirin
          files: filesWithSignedUrls, // Güncellenmiş dosyalar
        };

        return {
          ...aCase,
          application: signedApplication,
        };
      })
    );

    return enrichedCases;
  },
};

export default caseServices;
