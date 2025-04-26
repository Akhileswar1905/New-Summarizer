import { Router } from "express";
import { loginController, signupController } from "../controllers/auth";
// import multer from "multer";

// const storage = multer.memoryStorage();
// export const upload = multer({ storage });

export default (router: Router) => {
  /**
   * @swagger
   * /auth/signup:
   *   post:
   *     summary: Sign up a new user
   *     description: Registers a new user with their email and password.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: user@example.com
   *               password:
   *                 type: string
   *                 example: yourpassword123
   *     responses:
   *       201:
   *         description: User successfully created
   *       400:
   *         description: Bad request, validation error
   *       500:
   *         description: Internal server error
   */
  router.post(
    "/auth/signup",
    // upload.single("profilePic"),
    signupController
  );

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Log in an existing user
   *     description: Authenticates the user and returns a JWT token for further API access.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: user@example.com
   *               password:
   *                 type: string
   *                 example: yourpassword123
   *     responses:
   *       200:
   *         description: Successfully logged in, returns JWT token
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   example: your_jwt_token_here
   *       401:
   *         description: Unauthorized, invalid credentials
   *       500:
   *         description: Internal server error
   */
  router.post("/auth/login", loginController);
};
