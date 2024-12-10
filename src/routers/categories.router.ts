import express from "express";
import categories from "../controllers/categories.controller";
import { isAuthenticatedAdmin } from "../middlewares/admin.middleware";

export default (router: express.Router) => {
  router.post(
    "/categories/create-category",
    isAuthenticatedAdmin,
    categories.createCategory
  );

  router.get("/categories/get-categories", categories.getCategories);

  router.get(
    "/categories/get-category-by-id",
    isAuthenticatedAdmin,
    categories.getCategoryById
  );

  router.delete(
    "/categories/delete-category-by-id",
    isAuthenticatedAdmin,
    categories.deleteCategoryById
  );

  router.put(
    "/categories/update-category-by-id",
    isAuthenticatedAdmin,
    categories.updateCategoryById
  );
};
