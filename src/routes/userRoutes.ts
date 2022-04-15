import express from 'express'
import { authenticateUserService, registerUserService } from '../services/userService'

const router = express.Router()

router.post('/register', registerUserService)
router.post('/login', authenticateUserService)

export default router