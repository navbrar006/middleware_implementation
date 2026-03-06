import asyncErrorHandler from "../middleware/asyncErrorHandler.js";
import { HTTP_STATUS } from "../config/constants.js";

export const getDashboard = asyncErrorHandler(async (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    message: "Welcome to the protected dashboard",
    user: req.user,
  });
});