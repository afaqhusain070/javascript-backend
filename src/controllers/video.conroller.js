import { asyncHandler } from "../utils/asyncHandler";


const getAllVideos = asyncHandler(async(req, res) => {
    const {page= 1, limit = 10, query, sortBy, sortType, useId} = req.query

})

const publishAVideo = asyncHandler(async(req, res) => {
    const {title , description} = req.body
    // get vido upload to cloudnary, create video
})

const getVideoById = asyncHandler(async(req, res) => {
    const {videoId} = req.params
    // get video by id
})

const updateVideo = asyncHandler(async(req, res) => {
    const {videoId} = req.params
    // update video details like title,description , thumbnail
})

const deleteVideo = asyncHandler(async(req, res) => {
    const {videoId} = req.params
    // delete Video 
})
const togglePublishStatus = asyncHandler(async(req, res) => {
    const {videoId} = req.params
    // delete Video 
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}