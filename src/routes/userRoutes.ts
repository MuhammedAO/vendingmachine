import express from 'express'
import { authGuard } from '../middleware/authMiddleware'
import { authenticateUserService, getUserProfileService, registerUserService, updateUserProfileService } from '../services/userService'

const router = express.Router()

router.post('/register', registerUserService)
router.post('/login', authenticateUserService)
router.route('/profile').get(authGuard, getUserProfileService).put(authGuard, updateUserProfileService)

export default router