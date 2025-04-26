import { Request, Response } from "express";
import { db } from "../utils/dbconfig";
import { login, signup } from "../databases/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import { uploadFileToFirebase } from "../utils/upload_file";
dotenv.config();

export const signupController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const connection = await db.promise().getConnection();
  try {
    await connection.beginTransaction();

    // const file = req.file;
    // if (!file) return res.status(400).send("No file uploaded.");

    // const { url } = await uploadFileToFirebase(file, "profile_pics");

    const { email, password, username } = req.body;
    const response: any = await signup(
      connection,
      email,
      password,
      username
      // url
    );
    await connection.commit();
    const user = {
      email: email,
      username: username,
    };
    if (response.status !== 400) {
      const accessToken = jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET as string
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(201).send({
        message: "User created successfully",
        accessToken,
      });
    } else {
      res.status(400).send({
        message: "User already exists",
      });
    }
  } catch (error: any) {
    console.log(`Error at signupController: ${error.message}`);
    await connection.rollback();
    res.status(500).send("Internal Server Error");
  } finally {
    connection.release();
  }
};

export const loginController = async (req: Request, res: Response) => {
  const connection = await db.promise().getConnection();
  try {
    const { email, password } = req.body;
    const response = await login(connection, email, password);
    if (response.status === 404) {
      res.status(404).send(response);
    }
    await connection.commit();
    const user = {
      email: response.email,
      name: response.name,
    };
    const accessToken = jwt.sign(
      user,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    console.log(response);

    if (response) {
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).send({
        message: "Login successful",
        user: response,
        accessToken,
      });
      return;
    }

    res.status(400).send({
      message: "Login failed",
    });
  } catch (error: any) {
    console.log(`Error at loginController: ${error.message}`);
    await connection.rollback();
    res.status(500).send("Internal Server Error");
  } finally {
    connection.release();
  }
};
