import { apiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";

export const verifyJWT = asyncHandler(async (req, _, next)=>{
  try {
    const token=   req.cookies?.accessToken || req.header("authorization")?.replace("Bearer", "")
  
    if(!token){
      throw new apiError("Not authorized to access this route", 401)
    }
  
  //   jwt ka use
  
   const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,)
     
   const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
  
   if(!user){
      // TODO: discuss about frontend
      throw new apiError("Not authorized to access this route", 401)
   }
  
   req.user = user
   next()
  } catch (error) {
    throw new apiError(401, error?.message || "invalid access token")
  }
})