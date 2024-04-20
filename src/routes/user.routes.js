import { Router } from "express";
import { registerUser } from "../controllers/user.contoller";
const router = Router()

router.route("/register").post(registerUser)
// router.route("/login").post(registerUser)


export default router