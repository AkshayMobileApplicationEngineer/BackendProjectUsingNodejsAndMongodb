import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from '../model/user.model.js'; // Named import


export const VerifyJWT = asyncHandler(async (req, res, next) => {
  // Extract token from cookies or Authorization header
  const token = req.cookies?.accessToken ?? req.header("Authorization")?.replace("Bearer ", "");

  // Check if token exists
  if (!token) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Fetch the user associated with the decoded token
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if (!user) {
      // If no user is found, throw an error
      throw new ApiError(401, "Invalid Access Token: User not found");
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or route
    next();

  } catch (error) {
    // Differentiate between different JWT errors
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired, please login again");
    } else if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid token");
    } else {
      throw new ApiError(500, "Internal Server Error");
    }
  }
});
