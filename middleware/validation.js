import { AppError } from "../utils/errors.js";
import { HTTP_STATUS } from "../config/constants.js";

export const validateRegister = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Username and password are required", HTTP_STATUS.BAD_REQUEST));
  }

  if (password.length < 6) {
    return next(new AppError("Password must be at least 6 characters long", HTTP_STATUS.BAD_REQUEST));
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Username and password are required", HTTP_STATUS.BAD_REQUEST));
  }

  next();
};