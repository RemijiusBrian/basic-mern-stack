import express from "express";
import * as UsersController from "../controllers/usersController";

const router = express.Router();

router.get("/", UsersController.getUsersList);

router.get("/:userId", UsersController.getUserById);

router.post("/", UsersController.createUser);

export default router;