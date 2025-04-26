import { PoolConnection } from "mysql2/promise";

export const getUser = async (connection: PoolConnection, user_id: string) => {
  try {
    const [userRows]: any[] = await connection.query(
      "SELECT * FROM users WHERE user_id = ?",
      [user_id]
    );

    const [categoryRows] = await connection.query(
      `
      SELECT category, score FROM (
        SELECT 'general' AS category, general AS score FROM categories WHERE user_id = ?
        UNION ALL
        SELECT 'world', world FROM categories WHERE user_id = ?
        UNION ALL
        SELECT 'nation', nation FROM categories WHERE user_id = ?
        UNION ALL
        SELECT 'business', business FROM categories WHERE user_id = ?
        UNION ALL
        SELECT 'technology', technology FROM categories WHERE user_id = ?
        UNION ALL
        SELECT 'entertainment', entertainment FROM categories WHERE user_id = ?
        UNION ALL
        SELECT 'sports', sports FROM categories WHERE user_id = ?
        UNION ALL
        SELECT 'science', science FROM categories WHERE user_id = ?
        UNION ALL
        SELECT 'health', health FROM categories WHERE user_id = ?
      ) AS user_categories
      ORDER BY score DESC
      LIMIT 0
      `,
      Array(9).fill(user_id) // pass user_id 9 times
    );

    console.log(categoryRows);

    return {
      user: userRows[0],
      topCategories: categoryRows,
    };
  } catch (error) {
    console.error("Error fetching user and top categories:", error);
    throw error;
  }
};
