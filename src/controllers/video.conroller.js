import mongoose from "mongoose";
import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { Video } from "../models/video.model";


const getAllVideos = asyncHandler(async(req, res) => {
    const {page= 1, limit = 10, query, sortBy, sortType, userId} = req.query
    const match = {};
    if (query) {
        match.$or = [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } }
        ];
    }

    if (userId) {
        match.owner = userId;
    }

    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: { [sortBy]: sortType === 'asc' ? 1 : -1 },
        populate: 'owner'
    };

    const videos = await Video.aggregatePaginate(Video.aggregate([{ $match: match }]), options);
    
return res.status(200).json(200, {
    videos
})

})

const publishAVideo = asyncHandler(async(req, res) => {
    const {title , description} = req.body
    // get vido upload to cloudnary, create video
    const { videoFile, thumbnail } = req.files;

    if (!videoFile || !thumbnail) {
        return res.status(400).json({ message: 'Video file and thumbnail are required' });
    }

    // Upload video file to Cloudinary
    const videoResult = await cloudinary.uploader.upload_stream(
        { resource_type: 'video' },
        (error, result) => {
            if (error) throw new Error('Video upload failed');
            return result;
        }
    ).end(videoFile.buffer);

    // Upload thumbnail to Cloudinary
    const thumbnailResult = await cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
            if (error) throw new Error('Thumbnail upload failed');
            return result;
        }
    ).end(thumbnail.buffer);

    // Create new video document
    const newVideo = new Video({
        videoFile: videoResult.secure_url,
        thumbnail: thumbnailResult.secure_url,
        title,
        description,
        duration: videoResult.duration,
        owner: req.user._id, // Assuming user ID is stored in req.user
    });

    await newVideo.save();

  return  res.status(201).json(newVideo);
})

const getVideoById = asyncHandler(async(req, res) => {
    const {videoId} = req.params
    // get video by id
    const video = await Video.findById(videoId).populate('afaq', 'afaqhussain070@gmail.com'); 


    if (!video) {
        return res.status(404).json({ message: ' Video not found ' });
    }

  return  res.status(200).json(video);
})

const updateVideo = asyncHandler(async(req, res) => {
    const {videoId} = req.params
    // update video details like title,description , thumbnail
    const { title, description } = req.body;
    let thumbnail;

    // Check if a new thumbnail is provided
    if (req.file) {
        // Upload new thumbnail to Cloudinary
        const thumbnailResult = await cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
                if (error) throw new Error('Thumbnail upload failed');
                return result;
            }
        ).end(req.file.buffer);

        thumbnail = thumbnailResult.secure_url;
    }

    // Create an update object
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (thumbnail) updateData.thumbnail = thumbnail;

    // Find the video by ID and update
    const updatedVideo = await Video.findByIdAndUpdate(videoId, updateData, { new: true });

    if (!updatedVideo) {
        return res.status(404).json({ message: 'Video not found' });
    }

  return  res.status(200).json(updatedVideo,{
    message: 'Video updated successfully'
  });
})

const deleteVideo = asyncHandler(async(req, res) => {
    const {videoId} = req.params
    // delete Video 
     // Find the video by ID and delete
     const video = await Video.findByIdAndDelete(videoId);

     if (!video) {
         return res.status(404).json({ message: 'Video not found' });
     }
 
   return  res.status(200).json({ message: 'Video deleted successfully' });
})
const togglePublishStatus = asyncHandler(async(req, res) => {
    const {videoId} = req.params
    // delete Video 
    const video = await Video.findById(videoId);

    if (!video) {
        return res.status(404).json({ message: 'Video not found' });
    }

    // Toggle the isPublished status
    video.isPublished = !video.isPublished;

    // Save the updated video document
    await video.save();

   return res.status(200).json(video);
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}