import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Like } from "../models/like.model";

const toggleVideoLike = asyncHandler(async(req, res) => {
    const {videoId} = req.params
    // togle like on video

})
const toggleCommentLike = asyncHandler(async(req, res) => {
    const {commentId} = req.params
    // togle like on commment

})

const toggleTweetLike = asyncHandler(async(req, res) => {
    const {tweeId} = req.params
    // togle like on tweet

})
const getLikeVideos = asyncHandler(async(req, res) => {
    
    // get all liked videos

})
export {
    toggleVideoLike,
    getLikeVideos,
    toggleTweetLike,
    toggleCommentLike
}