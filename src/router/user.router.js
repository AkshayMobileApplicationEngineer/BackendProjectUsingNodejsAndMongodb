import { Router } from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserProfile,
  getwatchHistory,
} from '../controller/user.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { VerifyJWT } from '../middleware/auth.middleware.js';
import colors from 'colors'; // Importing colors for colored console logs

const router = Router();

const logRoute = (route, method, color) => {
  if (!process.env.PORT) {
    console.error('PORT is not defined in environment variables'.red);
    return;
  }
  console.log(`${method.toUpperCase()}: http://localhost:${process.env.PORT}/api/v1/user${route}`[color]);
};

// Route for user registration
router.route('/register').post(
  upload.fields([
    {
      name: 'avatar',
      maxCount: 1,
    },
    {
      name: 'coverImage',
      maxCount: 1,
    },
  ]),
  registerUser
);
logRoute('/register', 'post', 'green');

router.route('/login').post(loginUser);
logRoute('/login', 'post', 'yellow');

router.route('/logout').post(VerifyJWT, logoutUser);
logRoute('/logout', 'post', 'yellow');

router.route('/refresh-token').post(refreshAccessToken);
logRoute('/refresh-token', 'post', 'blue');

router.route('/change-password').patch(VerifyJWT, changeCurrentPassword);
logRoute('/change-password', 'patch', 'cyan');

router.route('/current-user').get(VerifyJWT, getCurrentUser);
logRoute('/current-user', 'get', 'cyan');

router.route('/update-account').patch(VerifyJWT, updateAccountDetails);
logRoute('/update-account', 'patch', 'cyan');

router.route('/avatar').patch(VerifyJWT, upload.single('avatar'), updateUserAvatar);
logRoute('/avatar', 'patch', 'cyan');

router.route('/cover-image').patch(VerifyJWT, upload.single('coverImage'), updateUserCoverImage);
logRoute('/cover-image', 'patch', 'cyan');

router.route('/c/:username').get(VerifyJWT, getUserProfile);
logRoute('/c/:username', 'get', 'cyan');

router.route('/history').get(VerifyJWT, getwatchHistory);
logRoute('/history', 'get', 'cyan');

export default router;
