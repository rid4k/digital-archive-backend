import { CategoriesModel } from "../models/categories.model";

const categoriesService = {
  getCategories: () => CategoriesModel.find(),

  getCategoryById: (id: string) => CategoriesModel.findById(id),

  createCategory: (values: Record<string, any>) =>
    new CategoriesModel(values).save().then((category) => category.toObject()),

  deleteCategoryById: (id: string) =>
    CategoriesModel.findOneAndDelete({ _id: id }),

  updateCategoryById: (id: string, values: Record<string, any>) =>
    CategoriesModel.findByIdAndUpdate(id, values, { new: true }),
};

export default categoriesService;
