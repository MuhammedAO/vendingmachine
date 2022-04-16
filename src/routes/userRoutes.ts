import express from 'express'
import { authGuard } from '../middleware/authMiddleware'
import { authenticateUserService, deleteUserProfileService, getUserProfileService, registerUserService, updateUserProfileService } from '../services/userService'

const router = express.Router()

router.post('/register', registerUserService)
router.post('/login', authenticateUserService)
router.route('/profile').get(authGuard, getUserProfileService).put(authGuard, updateUserProfileService)
router.delete('/profile/delete', authGuard, deleteUserProfileService)

export default router