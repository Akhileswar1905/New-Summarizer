import { Router } from "express";
import {
  getAllCategoriesController,
  updateUserCategoryInterestController,
} from "../controllers/categories";

export default (router: Router) => {
  router.get("/categories/:user_id", getAllCategoriesController);

  router.put("/categories/:user_id", updateUserCategoryInterestController);
};
