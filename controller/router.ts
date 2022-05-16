import express from "express";
import { createUser, getUser } from "./userController";

const router = express.Router();

router.get("/", getUser);
router.post("/", createUser);
// router.get("/:id", getUserWithId);
// router.delete("/:id", deleteUser);
// router.put("/:id", updateUser);

export default router;
