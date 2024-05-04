import {asyncHandler} from '../utils/asyncHandler'
import { apiError } from '../utils/apiError'
import {User} from '../models/user.model.js'
import { uploadOnCloudnary } from '../utils/cloudnary'
import { apiResponse } from '../utils/apiResponse.js'
import jwt from 'jsonwebtoken'

const generateAccessAndRefereshTokens = async(userId) =>{
   try {
      const user = await User.findById(userId)
     const accessToken = user.generateAccessToken()
     const referesh =  user.generateRefereshToken()

     user.refereshToken = refereshToken
    await user.save({validateBeforeSave:false})

    return {accessToken, refereshToken}

   } catch (error) {
      throw new apiError(500, "Something went wring you while generating referesh and access token")
   }
}

const registerUser = asyncHandler( async (req, res) => {
   const {fullName, email, password,username}= req.body 
   console.log(fullName,"fullName");
   if ([
    fullName , email, username, password
   ].some((field)=>field?.trim() === "")) {
    throw new apiError( 400,"fullname is required")
   }

   const existedUser= User.findOne({
        $or: [
            {username}, {email}
        ]
    })

    if(existedUser){
        throw new apiError(409, "User with email or username")
    }

   const avatorLocalPath =  req.files?.avator[0]?.path;
   // const coverImageLocalPath=req.files?.coverImage[0]?.path;

   let coverImageLocalPath;
   if(res.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0 ){
      coverImageLocalPath = req.files.coverImage[0].path
   }

   if(!avatorLocalPath ){
    throw new apiError(400, "Avator is required!")
   }

  const avator = await uploadOnCloudnary(avatorLocalPath)
  const coverImage = await uploadOnCloudnary(coverImageLocalPath)

  if(!avator){
    throw new apiError(400, "avator file is required")
  }

 const user =  User.create({
    fullName,
    avator: avator?.url ,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username?.toLowerCase()
  })

 const createdUser = User.findById(user._id).select("-password -refreshToken")

 if(!createdUser){
    throw new apiError(500, "some thing went wron registering the user")
 }

 return res.status(201).json(
    new apiResponse(200, createdUser, "user required Successfully")
 )

})

const loginUser = asyncHandler(async (req, res) => {
   //req body -> data
   //  username or email 
   // find the user
   // password cheack
   // access and refresh token
   // send cookies secure
   // response
   const {email, password, username} = req.body

   if(!(username || email)){
      throw new apiError(400, "username or email is required")
 
   }

    const user = await User.findOne({
      $or:[
         {username},{email}
      ]
   })

   if(!user){
      throw new apiError(400, "User does not exist!")
   }

  const ispasswordValid = await user.isPasswordCorrect(password)

  if(!ispasswordValid){
   throw new apiError(400, "password in correct ! ")
}

const {accessToken, refereshToken} = await generateAccessAndRefereshTokens(user._id)

const loggedInUser= await User.findById(user._id)
select("-password -refreshToken")

const options = {
   httpOnly: true,
   secure: true
}

return res 
.status(200)
.cookie("accessToken", accessToken, options)
.cookie("refreshToken", refereshToken, options)
.json(
   new apiResponse(
      200,
      {
         user: loggedInUser,accessToken, refereshToken
      },
      "user logged in successfully!"
   )
)

})

const logoutUser = asyncHandler(async (res, req) => {
   User.findByIdAndUpdate(
      req.user._id,
      {
         $set: {
            refreshToken: undefined
         }
      },
      {
         new: true
      },
   )
   const options = {
      httpOnly: true,
      secure: true
   }
   return res
      .status(200)
      .cookie("accessToken", options)
      .cookie("refreshToken", options)
      .json(new apiError(200, {}, "User logged Out!"))
   
})

const refreshAccessToken = asyncHandler(async (req, res) => {
 const incommingRefreshToken =  req.cookie.refereshToken || req.body.refereshToken

  if(!incommingRefreshToken){
   throw new apiError(401, {}, "No refresh token found")
  }
  
try {
   const decodedToken =  jwt.verify(incommingRefreshToken, process.env.REFERESH_TOKEN_SECRET)
   
   const user =await User.findById(decodedToken?.id)
   
   if(!user){
      throw new apiError(401,   "invalid refresh token ")
   }
   
   if(incommingRefreshToken !== user?.refereshToken){
      throw new apiError(401,   " refresh token is expired or used")
   } 
   
   const options = {
      httpOnly: true,
      secure: true
   }
   
   const {accessToken, newrefereshToken} = await generateAccessAndRefereshTokens(user._id)
   
   return res.status(200)
   .cookie("accessToken",accessToken, options)
   .cookie("refreshToken",newrefereshToken. options)
   .json(
      new apiResponse(
         200,
         {accessToken, refereshToken: newrefereshToken},
         'ACCESS TOKEN REDRESH'
      )
   )
} catch (error) {
   throw new apiError(401, error?.message || "invalid refresh token")
}

})

export {registerUser, loginUser, logoutUser,refreshAccessToken}