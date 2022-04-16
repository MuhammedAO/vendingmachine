import express from 'express'
import { authGuard } from '../middleware/authMiddleware'
import { authenticateUserService, getUserProfileService, registerUserService } from '../services/userService'

const router = express.Router()

router.post('/register', registerUserService)
router.post('/login', authenticateUserService)
router.route('/profile').get(authGuard, getUserProfileService)

export default router