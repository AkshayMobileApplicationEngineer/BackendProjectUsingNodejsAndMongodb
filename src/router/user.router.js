import { Router } from 'express';
import { loginUser, registerUser, logoutUser } from '../controller/user.controller.js'; // Correct import name
import { upload } from '../middleware/multer.middleware.js';
import { VerifyJWT } from '../middleware/auth.middleware.js'; // Corrected spelling

const router = Router();

// Route for user registration
router.route('/register').post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1
    },
    {
      name: "coverImage",
      maxCount: 1
    }
  ]),
  registerUser
);

// Log route for registration
console.log(`http://localhost:${process.env.PORT}/api/v1/user/register`.green);

// Route for user login
router.route('/login').post(loginUser);

// Log route for login
console.log(`http://localhost:${process.env.PORT}/api/v1/user/login`.yellow);

// Secured route for logout
router.route('/logout').post(VerifyJWT, logoutUser);

// Log route for logout
console.log(`http://localhost:${process.env.PORT}/api/v1/user/logout`.yellow);



export default router;
