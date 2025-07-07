import { Router } from "express";
import { 
	createUserController,
	getUserController,
	updateUserController,
	deleteUserController,
	getAllUsersController
} from "./user.controller.ts";

const userRouter = Router();

// User routes
userRouter.post("/", createUserController);
userRouter.get("/", getAllUsersController);
userRouter.get("/:id", getUserController);
userRouter.put("/:id", updateUserController);
userRouter.delete("/:id", deleteUserController);

export { userRouter };