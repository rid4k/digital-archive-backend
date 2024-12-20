import { ApplicationModel } from "../models/application.model";

const applicationServices = {
  getApplications: () => ApplicationModel.find(),

  getPendingApplications: () => ApplicationModel.find({ status: "pending" }),

  getApprovedApplications: () => ApplicationModel.find({ status: "approved" }),

  getRejectedApplications: () => ApplicationModel.find({ status: "rejected" }),

  getIndividualApplications: () =>
    ApplicationModel.find({ applicantType: "individual" }),

  getInstitutionalApplications: () =>
    ApplicationModel.find({ applicantType: "institutional" }),

  getApplicationById: (id: string) => ApplicationModel.findById(id),

  createApplication: (values: Record<string, any>) =>
    new ApplicationModel(values)
      .save()
      .then((application) => application.toObject()),

  deleteApplicationById: (id: string) =>
    ApplicationModel.findOneAndDelete({ _id: id }),

  updateApplicationById: (id: string, values: Record<string, any>) =>
    ApplicationModel.findByIdAndUpdate(id, values),
};

export default applicationServices;
