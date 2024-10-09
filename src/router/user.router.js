import { Router } from 'express';
import { loginUser, registerUser, logoutUser, refreshAccessToken } from '../controller/user.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { VerifyJWT } from '../middleware/auth.middleware.js';
import colors from 'colors'; // Importing colors for colored console logs

const router = Router();

const logRoute = (route, method, color) => {
  console.log(`${method.toUpperCase()}: http://localhost:${process.env.PORT}/api/v1/user${route}`[color]);
};

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
logRoute('/register', 'post', 'green');

// Route for user login
router.route('/login').post(loginUser);
logRoute('/login', 'post', 'yellow');

// Secured route for logout
router.route('/logout').post(VerifyJWT, logoutUser);
logRoute('/logout', 'post', 'yellow');

// Route for refreshing token
router.route('/refresh-Token').post(refreshAccessToken);
logRoute('/refresh-Token', 'post', 'blue');

export default router;
