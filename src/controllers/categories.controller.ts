import express from "express";
import categoriesService from "../services/categories.services";

const categories = {
  createCategory: async (req: express.Request, res: express.Response) => {
    try {
      const { title, description } = req.body;

      if (!title) {
        res.status(400).json({ message: "Title is required" });
        return;
      }

      const category = await categoriesService.createCategory({
        title,
        description,
      });

      res.status(201).json(category);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  getCategories: async (req: express.Request, res: express.Response) => {
    try {
      const categories = await categoriesService.getCategories();

      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  getCategoryById: async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.body;

      const category = await categoriesService.getCategoryById(id);

      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }

      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  deleteCategoryById: async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.body;

      const category = await categoriesService.deleteCategoryById(id);

      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }

      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },

  updateCategoryById: async (req: express.Request, res: express.Response) => {
    try {
      const { id, title, description } = req.body;

      if (!id) {
        res.status(400).json({ message: "ID is required" });
        return;
      }

      const category = await categoriesService.updateCategoryById(id, {
        title,
        description,
      });

      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }

      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
      return;
    }
  },
};

export default categories;
