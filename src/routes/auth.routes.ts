import express from "express";
import {
  register,
  login,
  verifyEmail
} from "../controllers/auth.controller";

import { validate } from "../middlewares/validate";

import {
  registerValidation,
  loginValidation
} from "../validations/auth.validation";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ishan
 *               email:
 *                 type: string
 *                 example: ishan@test.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Registration successful
 */
router.post(
  "/register",
  validate(registerValidation),
  register
);

router.post(
  "/login",
  validate(loginValidation),
  login
);

router.get(
  "/verify",
  verifyEmail
);

export default router;