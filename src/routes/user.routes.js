import { Router } from "express";
import { registerUser, loginUser, logoutUser , refreshAccessToken, changeCurrentpassword, getCurrentUser, updateUserAvatar, UserUpdateDetail, updateUserCoverImage, getUserChannelProfile, getWatchHistory} from "../controllers/user.contoller";
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
router.route("/change-passwrod").post(verifyJWT, changeCurrentpassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, UserUpdateDetail)
router.route("/update-avator").patch(verifyJWT, upload.single("avator"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("/coverImage"), updateUserCoverImage)
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

export default router
