import { asyncHandler } from '../utils/asyncHandler.js';
import { json, Router } from 'express';
import colors from 'colors';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../model/user.model.js'; // Import your User model
import uploadOnCloudinary from '../utils/uploadOnCloudinary.js'; // Ensure Cloudinary setup is correctly imported
import cookieParser from 'cookie-parser'; // cookie parser

const generateAccessAndRefreshToken = async (findAccountId) => {
  try {
    const user = await User.findById(findAccountId);

    // Generate access and refresh tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save the refresh token to the user's record
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access tokens");
  }
};

// Define the registerUser function
const registerUser = asyncHandler(async (req, res) => {
  // Get user details from frontend
  const { fullname, email, username, password } = req.body;
  console.log("Request Body:", req.body);
  console.log("Email:", email, "Password:", password, "Username:", username, "Full Name:", fullname);

  // Validation - Check if fields are not empty
  if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (existingUser) {
    console.log(JSON.stringify({
      username: existingUser.username,
      email: existingUser.email
    }, null, 2)); // Pretty print with 2-space indentation
    throw new ApiError(409, "User already exists");
  }
  console.log(req.files);

  // Check for avatar and cover image upload
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  console.log("Avatar Path:", avatarLocalPath);
  console.log("Cover Image Path:", coverImageLocalPath);

  // Ensure avatar is provided
  if (!avatarLocalPath) {
    console.log("Avatar file path not found".red);
    throw new ApiError(400, "Avatar file is required");
  }

  // Upload avatar to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file upload failed");
  }

  // Upload cover image if provided
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

  // Create the user object and save it to the database
  const user = await User.create({
    fullname,
    avatar: avatar?.url, // Safeguard in case avatar is undefined
    coverImage: coverImage?.url || "", // Safeguard in case coverImage is undefined
    email,
    password,
    username: username.toLowerCase()
  });

  // Find the created user and exclude password and refreshToken fields
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Return the response
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
  console.log(JSON.stringify(createdUser));
});

// Username or email login function
const loginUser = asyncHandler(async (req, res) => {
  // Get data from the request body
  const { email, username, password } = req.body;
  console.log(req.body);

  // Username or email
  if (!email || !password) {
    throw new ApiError(400, "Username or email is required");
  }

  // Find the user
  const user = await User.findOne({
    $or: [{ username }, { email }]
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // Password check
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // Access and refresh token generation
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  // Send cookies
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
  const options = {
    httpOnly: true,
    secure: true
  };

  // Return response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200, {
          user: loggedInUser, accessToken, refreshToken
        },
        "User Logged In Successfully"
      )
    );
});

// Logout user function
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined }
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
      new ApiResponse(200, {}, "User logged out successfully")
    );
});

// Export the functions
export { registerUser, loginUser, logoutUser };
