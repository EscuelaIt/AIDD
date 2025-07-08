import { Router } from "express";
import {
  deleteUserController,
  getAllUsersController,
  getUserController,
  postUserController,
  putUserController,
} from "./user.controller.ts";

const userRouter = Router();

// User routes
userRouter.post("/", postUserController);
userRouter.get("/", getAllUsersController);
userRouter.get("/:id", getUserController);
userRouter.put("/:id", putUserController);
userRouter.delete("/:id", deleteUserController);

export { userRouter };
