import express from "express";
import applicationServices from "../services/application.services";
import { ApplicationInterface } from "../models/application.model";
import helpers from "../helpers/helper";

const application = {
  createApplication: async (req: express.Request, res: express.Response) => {
    try {
      const applicationData: ApplicationInterface = req.body;

      if (
        !applicationData.applicantTc ||
        !applicationData.applicantName ||
        !applicationData.applicantSurname ||
        !applicationData.applicantPhone ||
        !applicationData.applicantEmail ||
        !applicationData.applicantType ||
        !applicationData.applicationReason ||
        !applicationData.applicationType
      ) {
        res.status(400).json({ message: "Required data not found" });
        return;
      }

      if (req.body.uploadedFiles) {
        const uploadedFiles = req.body.uploadedFiles || [];

        applicationData.files = uploadedFiles.map(
          (fileKey: any, index: number) => {
            const userDescription =
              applicationData.files && applicationData.files[index]
                ? applicationData.files[index].description
                : "";

            return {
              fileKey: fileKey,
              description: userDescription || "No description provided",
            };
          }
        );
      }

      const application = await applicationServices.createApplication(
        applicationData
      );

      res.status(200).json(application);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  getApplications: async (req: express.Request, res: express.Response) => {
    try {
      const applications = await applicationServices.getApplications();

      if (!applications) {
        res.status(400).json({ message: "Application data not found" });
        return;
      }

      const signedApplications = await Promise.all(
        applications.map(async (application) => {
          const filesWithSignedUrls = Array.isArray(application.files)
            ? await Promise.all(
                application.files.map(async (file) => ({
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
            ...application.toObject(), // Eğer Mongoose modeli ise düz objeye çevirin
            files: filesWithSignedUrls, // Sadece dosyaları güncelle
          };
        })
      );

      res.status(200).json(signedApplications);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  getPendingApplications: async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const applications = await applicationServices.getPendingApplications();

      if (!applications) {
        res.status(400).json({ message: "Application data not found" });
        return;
      }

      const signedApplications = await Promise.all(
        applications.map(async (application) => {
          const filesWithSignedUrls = Array.isArray(application.files)
            ? await Promise.all(
                application.files.map(async (file) => ({
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
            ...application.toObject(), // Eğer Mongoose modeli ise düz objeye çevirin
            files: filesWithSignedUrls, // Sadece dosyaları güncelle
          };
        })
      );

      res.status(200).json(signedApplications);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  getApprovedApplications: async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const applications = await applicationServices.getApprovedApplications();

      if (!applications) {
        res.status(400).json({ message: "Application data not found" });
        return;
      }

      const signedApplications = await Promise.all(
        applications.map(async (application) => {
          const filesWithSignedUrls = Array.isArray(application.files)
            ? await Promise.all(
                application.files.map(async (file) => ({
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
            ...application.toObject(), // Eğer Mongoose modeli ise düz objeye çevirin
            files: filesWithSignedUrls, // Sadece dosyaları güncelle
          };
        })
      );

      res.status(200).json(signedApplications);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  getRejectedApplications: async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const applications = await applicationServices.getRejectedApplications();

      if (!applications) {
        res.status(400).json({ message: "Application data not found" });
        return;
      }

      const signedApplications = await Promise.all(
        applications.map(async (application) => {
          const filesWithSignedUrls = Array.isArray(application.files)
            ? await Promise.all(
                application.files.map(async (file) => ({
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
            ...application.toObject(), // Eğer Mongoose modeli ise düz objeye çevirin
            files: filesWithSignedUrls, // Sadece dosyaları güncelle
          };
        })
      );

      res.status(200).json(signedApplications);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  getIndividualApplications: async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const applications =
        await applicationServices.getIndividualApplications();

      if (!applications) {
        res.status(400).json({ message: "Application data not found" });
        return;
      }

      const signedApplications = await Promise.all(
        applications.map(async (application) => {
          const filesWithSignedUrls = Array.isArray(application.files)
            ? await Promise.all(
                application.files.map(async (file) => ({
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
            ...application.toObject(), // Eğer Mongoose modeli ise düz objeye çevirin
            files: filesWithSignedUrls, // Sadece dosyaları güncelle
          };
        })
      );

      res.status(200).json(signedApplications);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  getInstitutionalApplications: async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const applications =
        await applicationServices.getInstitutionalApplications();

      if (!applications) {
        res.status(400).json({ message: "Application data not found" });
        return;
      }

      const signedApplications = await Promise.all(
        applications.map(async (application) => {
          const filesWithSignedUrls = Array.isArray(application.files)
            ? await Promise.all(
                application.files.map(async (file) => ({
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
            ...application.toObject(), // Eğer Mongoose modeli ise düz objeye çevirin
            files: filesWithSignedUrls, // Sadece dosyaları güncelle
          };
        })
      );

      res.status(200).json(signedApplications);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  getApplicationById: async (req: express.Request, res: express.Response) => {
    try {
      const { applicationId } = req.body;

      if (!applicationId) {
        res.status(400).json({ message: "Required data not found" });
        return;
      }

      const application = await applicationServices.getApplicationById(
        applicationId
      );

      if (!application) {
        res.status(400).json({ message: "Application not found" });
        return;
      }

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

      res.status(200).json(signedApplication);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  deleteApplication: async (req: express.Request, res: express.Response) => {
    try {
      const { applicationId } = req.body;

      if (!applicationId) {
        res.status(400).json({ message: "Required data not found" });
        return;
      }

      const existApplication = await applicationServices.getApplicationById(
        applicationId
      );

      if (!existApplication) {
        res.status(400).json({ message: "Application not found" });
        return;
      }

      const application = await applicationServices.deleteApplicationById(
        applicationId
      );

      res.status(200).json(application);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  updateApplication: async (req: express.Request, res: express.Response) => {
    try {
      const applicationData: ApplicationInterface = req.body;
      const { applicationId } = req.body;

      if (
        !applicationId ||
        !applicationData.applicantTc ||
        !applicationData.applicantName ||
        !applicationData.applicantSurname ||
        !applicationData.applicantPhone ||
        !applicationData.applicantEmail ||
        !applicationData.applicantType ||
        !applicationData.applicationReason ||
        !applicationData.applicationType
      ) {
        res.status(400).json({ message: "Required data not found" });
        return;
      }

      const application = await applicationServices.updateApplicationById(
        applicationId,
        applicationData
      );

      if (!application) {
        res.status(400).json({ message: "Application not found" });
        return;
      }

      res.status(200).json(application);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  updateApplicationStatus: async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const { applicationId, status } = req.body;

      if (!applicationId || !status) {
        res.status(400).json({ message: "Required data not found" });
        return;
      }

      if (status != "pending" && status != "approved" && status != "rejected") {
        res.status(400).json({ message: "Status data is not allowed" });
        return;
      }

      const updatedApplication =
        await applicationServices.updateApplicationStatus(
          applicationId,
          status
        );

      if (!updatedApplication) {
        res.status(400).json({ message: "Application not found" });
        return;
      }

      res.status(200).json(updatedApplication);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },
};

export default application;
