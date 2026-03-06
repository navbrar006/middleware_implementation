import { registerUser, loginUser } from "../services/authService.js";
import asyncErrorHandler from "../middleware/asyncErrorHandler.js";
import { HTTP_STATUS } from "../config/constants.js";

export const register = asyncErrorHandler(async (req, res) => {
  const { username, password } = req.body;
  const result = await registerUser(username, password);
  res.status(HTTP_STATUS.CREATED).json(result);
});

export const login = asyncErrorHandler(async (req, res) => {
  const { username, password } = req.body;
  const result = await loginUser(username, password);
  res.status(HTTP_STATUS.OK).json(result);
});