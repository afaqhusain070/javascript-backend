import { Comment } from "../models/comment.model";
import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";


const getVideoComments = asyncHandler(async(res,req)=>{
    const {videoId} = req.params;
    const {page = 1, limit = 10 } = req.query
})

const addComment = asyncHandler(async(req, res) => {
    // add a comment to a video
})

const updateComment = asyncHandler(async(req, res) => {
    // update a comment 
})

const deleteComment = asyncHandler(async(req, res) => {
    // Delete a comment 
})

export {
    getVideoComments,
    addComment,
    deleteComment,
    updateComment
}