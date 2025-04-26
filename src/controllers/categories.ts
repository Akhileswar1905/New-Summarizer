import { Request, Response } from "express";
import { db } from "../utils/dbconfig";
import {
  getAllCategories,
  updateUserCategoryInterest,
} from "../databases/categories";

export const getAllCategoriesController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const connection = await db.promise().getConnection();
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const response = await getAllCategories(connection, user_id as string);

    if (!response) {
      return res.status(404).json({
        message: "Categories not found for the user",
      });
    }

    return res.status(200).json({
      data: response,
    });
  } catch (error: any) {
    console.error("Error while fetching categories", error.message);
    return res.status(500).json({
      message: "Error while fetching categories",
    });
  } finally {
    connection.release();
  }
};

export const updateUserCategoryInterestController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const connection = await db.promise().getConnection();
  try {
    const { user_id } = req.params;
    const interests = req.body;

    if (!user_id) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    if (!interests || Object.keys(interests).length === 0) {
      return res.status(400).json({
        message: "No category interests provided",
      });
    }

    await updateUserCategoryInterest(connection, user_id as string, interests);

    return res.status(200).json({
      message: "User category interests updated successfully",
    });
  } catch (error: any) {
    console.error("Error while updating category interests", error.message);
    return res.status(500).json({
      message: "Error while updating category interests",
    });
  } finally {
    connection.release();
  }
};
