import mongoose , { isValidObjectId} from "mongoose";
import { User } from "../models/user.model";
import { Tweet } from "../models/tweet.model";
import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";


const createTweet = asyncHandler(async(req, res) =>{
    // create tweet
})

const getUserTweet = asyncHandler(async(req, res) =>{
    // get user tweets
})
const updateTweet = asyncHandler(async(req, res) =>{
    // update tweet
})

const deleteTweet = asyncHandler(async(req, res) =>{
    // delete tweet
})

export {
    createTweet,
    getUserTweet,
    updateTweet,
    deleteTweet
}
