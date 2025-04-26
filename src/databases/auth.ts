import { PoolConnection } from "mysql2/promise";
import bcrypt from "bcryptjs";
export async function signup(
  connection: PoolConnection,
  email: string,
  password: string,
  username: string
  // avatar: string
) {
  try {
    const [user]: any[] = await connection.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    // console.log(avatar);

    if (user.length === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`;
      const [rows]: any[] = await connection.query(query, [
        email,
        hashedPassword,
        username,
        // avatar,
      ]);

      const categories_query = `INSERT INTO categories (user_id) VALUES (?)`;
      await connection.query(categories_query, [rows.insertId]);

      const user_id = rows.insertId;

      return user_id;
    }

    return {
      message: "User already registered",
      status: 400,
    };
  } catch (error: any) {
    console.log(`Error at signup: ${error.message}`);
    throw error;
  }
}

export async function login(
  connection: PoolConnection,
  email: string,
  password: string
) {
  try {
    const query = `SELECT * FROM users WHERE user_email LIKE ?`;
    const [rows]: any[] = await connection.execute(query, [email]);
    if (rows.length === 0) {
      throw new Error("User not found");
    }
    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.user_password);
    if (!isPasswordValid) {
      throw new Error("Password is incorrect");
    }
    return user;
  } catch (error: any) {
    console.log(`Error at login: ${error.message}`);
    throw error;
  }
}
