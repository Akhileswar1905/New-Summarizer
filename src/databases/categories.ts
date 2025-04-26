import { PoolConnection } from "mysql2/promise";

export const getAllCategories = async (
  connection: PoolConnection,
  user_id: string
) => {
  try {
    const [categoryRows]: any[] = await connection.query(
      "SELECT * FROM categories WHERE user_id = ?",
      [user_id]
    );

    return categoryRows[0]; // assuming one row per user
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

interface CategoryUpdate {
  general?: number;
  world?: number;
  nation?: number;
  business?: number;
  technology?: number;
  entertainment?: number;
  sports?: number;
  science?: number;
  health?: number;
}

export const updateUserCategoryInterest = async (
  connection: PoolConnection,
  user_id: string,
  interests: CategoryUpdate
) => {
  try {
    const fields = Object.keys(interests);
    const values = Object.values(interests);

    if (fields.length === 0) return;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");

    await connection.query(
      `UPDATE categories SET ${setClause} WHERE user_id = ?`,
      [...values, user_id]
    );

    return { message: "Category interests updated successfully" };
  } catch (error) {
    console.error("Error updating category interests:", error);
    throw error;
  }
};
