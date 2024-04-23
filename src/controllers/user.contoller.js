import {asyncHandler} from '../utils/asyncHandler'
import { apiError } from '../utils/apiError'
import {User} from '../models/user.model'
import { uploadOnCloudnary } from '../utils/cloudnary'
import { apiResponse } from '../utils/apiResponse'

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

export {registerUser}