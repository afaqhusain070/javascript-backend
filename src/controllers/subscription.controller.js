import mongoose from "mongoose";
import { Subsciption } from "../models/subscribation.model";
import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";

const createSubscriber = asyncHandler(async(req,res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user) return apiError(res, 404, "User not found");
    const subscription = await Subsciption.findOne({ user: user._id });
    if(subscription){
        throw new apiError(404, "Subscriber not found")
    }
    return res.status(200).json(
        200, subscription , "subscriber are porovided"
    )
})