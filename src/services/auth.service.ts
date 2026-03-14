import User from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/hash";
import crypto from "crypto";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";


export const registerUserService = async (
  name: string,
  email: string,
  password: string
) => {

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await hashPassword(password);

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isVerified: false,
    verificationToken,
    verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000
  });

  return user;

};



export const verifyEmailService = async (token: string) => {

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new AppError("Invalid or expired token", 400);
  }

  user.isVerified = true;
  user.verificationToken = null;
  user.verificationTokenExpires = null;

  await user.save();

};



export const loginUserService = async (
  email: string,
  password: string
) => {

  const user = await User.findOne({ email });
  console.log('====================================');
  console.log(user);
  console.log('====================================');
  logger.info(`User found: ${user ? "Yes" : "No"}`);

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  if (!user.isVerified) {
    throw new AppError("Email not verified", 403);
  }

  const passwordMatch = await comparePassword(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  return user;

};