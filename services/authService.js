import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User.js";
import { AppError } from "../utils/errors.js";
import { HTTP_STATUS, MESSAGES } from "../config/constants.js";

dotenv.config();

const registerUser = async (username, password) => {
  const existingUser = User.findByUsername(username);

  if (existingUser) {
    throw new AppError(MESSAGES.USER_EXISTS, HTTP_STATUS.BAD_REQUEST);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    username,
    password: hashedPassword,
  };

  User.create(newUser);

  return {
    message: MESSAGES.USER_REGISTERED,
    userId: newUser.id,
  };
};

const loginUser = async (username, password) => {
  const user = User.findByUsername(username);

  if (!user) {
    throw new AppError(MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError(MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    message: MESSAGES.LOGIN_SUCCESS,
    token,
  };
};

export { registerUser, loginUser };