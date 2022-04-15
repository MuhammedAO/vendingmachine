import express from 'express'
import { registerUserService } from '../services/userService'

const router = express.Router()

router.post('/register', registerUserService)

export default router