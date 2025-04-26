import { Request, Response } from "express";
import { db } from "../utils/dbconfig";
import { getUser } from "../databases/user";

export const getUserController = async (
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

    const response: any = await getUser(connection, user_id as string);
    if (response.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      data: response,
    });
  } catch (error: any) {
    console.log("Error while fetching user data", error.message);
    return res.status(500).json({
      message: "Error while fetching user data",
    });
  }
};
