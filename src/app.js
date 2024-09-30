import express from 'express';
import color from 'colors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import UserRouter from './router/user.router.js'; // Moved this import up for clarity

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Set allowed origins from environment
    credentials: true
}));

app.use(express.json({
    limit: "1MB"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "1MB"
}));

app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/v1/user", UserRouter); 
console.log(`http://localhost:${process.env.PORT}/api/v1/user/register`.red); // Log the register URL

// 404 Route Handler for unmatched routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Resource not found"
    });
});

// Global Error Handler (optional, for catching errors from asyncHandler or middleware)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Server Error",
        error: err.message
    });
});


// Export the app
export { app };
