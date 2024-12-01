import { UserModel } from "../models/users.model";

const userServices = {
  getUsers: () => UserModel.find(),

  getUserById: (id: string) => UserModel.findById(id),

  getUserByTcNumber: (tcNumber: number) => UserModel.findOne({ tcNumber }),

  createUser: (values: Record<string, any>) =>
    new UserModel(values).save().then((user) => user.toObject()),

  deleteUserById: (id: string) => UserModel.findOneAndDelete({ _id: id }),

  updateUserById: (id: string, values: Record<string, any>) =>
    UserModel.findByIdAndUpdate(id, values),
};

export default userServices;
