import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  registerUserService,
  verifyEmailService,
  loginUserService
} from "../services/auth.service";

import { logger } from "../utils/logger";
import { emailQueue } from "../queues/email.queue";

// import sendEmail from "../services/email.service";

export const register = asyncHandler(async (req, res) => {
  logger.info("User registration started");

  const { name, email, password } = req.body;

  const user = await registerUserService(
    name,
    email,
    password
  );

  // await emailQueue.add("sendVerificationEmail", {
  //   email: user.email,
  //   token: user.verificationToken
  // }); // Normal way to add job to queue

  await emailQueue.add(
    "sendVerificationEmail",
    {
      email: user.email,
      token: user.verificationToken
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000
      }
    }
  ); // With retry and backoff options

  res.status(201).json({
    message: "Registration successful. Please verify your email."
  });

});



export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {

  const { token } = req.query;

  await verifyEmailService(token as string);

  res.json({
    message: "Email verified successfully"
  });

});



export const login = asyncHandler(async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const user = await loginUserService(email, password);

  res.json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });

});