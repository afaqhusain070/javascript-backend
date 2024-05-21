import { apiError } from "../utils/apiError";
import { apiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";


const helthcheck = asyncHandler(async(req, res) => {
    // build a healthcheck respose that simply returns the Ok status as json with a message
})

export {
    helthcheck
}