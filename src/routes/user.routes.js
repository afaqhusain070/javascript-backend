import { Router } from "express";
import { registerUser, loginUser, logoutUser , refreshAccessToken} from "../controllers/user.contoller";
const router = Router()
import { verifyJWT } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

router.route("/register").post(
    //  this is middleware for upload file
    upload.fields([
        {name: "avator", maxCount: 1,},
        {name: "coverImage", maxCount: 1 }
    ]),
    registerUser)
router.route("/login").post(loginUser)
// secired routes
router.route("/logout").post(verifyJWT , logoutUser)
router.route("/refresh-token").post(refreshAccessToken)


export default router