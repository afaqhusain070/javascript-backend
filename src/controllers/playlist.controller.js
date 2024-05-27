import mongoose from "mongoose";
import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";
import { Playlist } from "../models/plaulist.model";


const createPlayList = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    //create playlist
})


const getUserPlayLists = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    // get user playlists
})

const getPlayListById = asyncHandler(async (req, res) => {
    const { PlaylistId } = req.params;
})

const addVideoToPlayList = asyncHandler(async (req, res) => {
    const {PlaylistId, videoId } = req.params;
})

const removeVideoFromPlayLisrt = asyncHandler(async (req, res) => {
    const {PlaylistId, videoId } = req.params;
    // delete playlist
})

const deletePlayList = asyncHandler(async (req, res) => {
    const {PlaylistId } = req.params;
    // update playlist
})

const updatePlayList = asyncHandler(async (req, res) => {
    const {PlaylistId } = req.params;
    const {name, description} = req.body
    // update playlist
})

export {
    createPlayList,
    updatePlayList,
    removeVideoFromPlayLisrt,
    deletePlayList,addVideoToPlayList,
    getPlayListById
}