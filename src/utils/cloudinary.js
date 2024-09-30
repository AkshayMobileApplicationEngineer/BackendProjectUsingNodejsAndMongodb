import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload a file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // If the file path is invalid, return null
        if (!localFilePath) return null;

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // Automatically detect the file type (image, video, etc.)
        });

        // Log and return the URL of the uploaded file
        console.log("File uploaded to Cloudinary:", response.url);

        // Remove the local file after uploading
        fs.unlinkSync(localFilePath);
        console.log("Local file deleted:", localFilePath);

        return response.url;

    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);

        // If an error occurs, attempt to delete the local file
        try {
            fs.unlinkSync(localFilePath);
            console.log("Local file deleted:", localFilePath);
        } catch (unlinkError) {
            console.error("Error deleting local file:", unlinkError);
        }

        return null;
    }
};

export default uploadOnCloudinary;
