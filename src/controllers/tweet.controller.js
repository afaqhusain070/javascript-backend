import mongoose , { isValidObjectId} from "mongoose";
import { User } from "../models/user.model";
import { Tweet } from "../models/tweet.model";
import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";


const createTweet = asyncHandler(async(req, res) =>{
    const {content, owner} = req.body
    if(!(content || owner)){
        return apiError(400, "Please provide the content and owner")
    }
    
    const tweet =await Tweet.create({
        content, owner
    })
    if(!tweet){
        return apiError(401, "tweet are unavailable")
    }

   return res
   .status(200)
   .json(400, tweet , "tweet are porovided")
 

})

const getUserTweet = asyncHandler(async(req, res) =>{
    const {userId} = req.params
    if(!userId){
        throw new apiError(400,"userId not available!")
    }
    // get user tweets
    const userTweets = await Tweet.find({owner: userId})
    if(!userTweets){
        return apiError(401, "user tweets are unavailable")
    }
    return res
    .status(200)
    .json(400, userTweets , "user tweets are porovided")
})

const updateTweet = asyncHandler(async(req, res) =>{
    const {tweetId} = req.params
    if(!tweetId){
        throw new apiError(400,"userId not available!")
    }

    const {content} = req.body
    if(!content){
        throw new apiError(400,"content not available!")
    }
    // update tweet
    const updateTweets = Tweet.findByIdAndUpdate(tweetId, {
        content
    },
{
    new: true
}) 
return res.status(200).json(
    {
        success: true,
        data: updateTweets,
        message :"tweet update successfull "
    }
) 
})

const deleteTweet = asyncHandler(async(req, res) =>{
    // delete tweet
    const {tweetId} = req.params

    const tweet = await Tweet.findByIdAndDelete(tweetId)
    if(!tweet){
        throw new apiError(400, "tweet not available")
    }
    await tweet.remove()
    return res.status(200).json(
        {
            message: "tweet delete Successfully"
        }
    )

})

export {
    createTweet,
    getUserTweet,
    updateTweet,
    deleteTweet
}
