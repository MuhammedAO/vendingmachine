import asyncHandler from "express-async-handler"
import UserModel from "../models/UserModel"
import generateToken from "../utils/generateToken"
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/userValidation"

const authenticateUserService = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  await loginUserValidation(req.body)
  const user = await UserModel.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

const registerUserService = asyncHandler(async (req, res): Promise<void> => {
  const { role, username, password } = req.body

  if (!(role === "seller" || role === "buyer"))
    throw new Error("A role can be either buyer or seller")

  await registerUserValidation(req.body)

  const userExists = await UserModel.findOne({ username })

  if (userExists) {
    res.status(400)
    throw new Error(" user already exists")
  }

  const user = await UserModel.create({
    role,
    username,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("invalid user data")
  }
})

const getUserProfileService = asyncHandler(async (req: any, res) => {
  const user = await UserModel.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
    })
  } else {
    res.status(404)
    throw new Error("user not found")
  }
})

const updateUserProfileService = asyncHandler(async (req: any, res) => {
  const user = await UserModel.findById(req.user._id)
  if (user) {
    user.username = req.body.username || user.username
    user.role = req.body.role || user.role
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error("user not found")
  }
})

export {
  registerUserService,
  authenticateUserService,
  getUserProfileService,
  updateUserProfileService,
}
