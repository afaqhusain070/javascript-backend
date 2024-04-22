import { Router } from "express";
import { registerUser } from "../controllers/user.contoller";
const router = Router()
import { upload } from "../middlewares/multer.middleware";

router.route("/register").post(
    upload.fields([
        {name: "avator", maxCount: 1,},
        {name: "coverImage", maxCount: 1 }
    ]),
    registerUser)
// router.route("/login").post(registerUser)


export default router