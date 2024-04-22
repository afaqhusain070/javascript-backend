import { v2 as cloudinary } from "cloudinary";

import {fs} from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUDNARY_CLOUD_NAEM,
    api_key: process.env.CLOUDNARY_API_KEY, 
    api_secret: process.env.CLOUDNARY_API_SECRET
  });

  const uploadOnCloudnary = async (localFilePth) => {
    try {
        if(!localFilePth) return null
        //uploadfile to cloudnary
      const response = await  cloudinary.uploader.upload(localFilePth, {
            resource_type: "auto"
        })
        //file has been uploaded
        // console.log('file is uploaded on cloudnary', response.url)

        fs.unlinkSync(localFilePth)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePth)// remove the local file on temporary file as the upload operatoin got fail
        return null
    }
  }
export {uploadOnCloudnary}
