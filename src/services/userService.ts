import asyncHandler from "express-async-handler"
import UserModel from "../models/UserModel"
import generateToken from "../utils/generateToken"
import { loginUserValidation, registerUserValidation } from "../validation/userValidation"



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

  if (!((role === "seller") || (role === "buyer"))) throw new Error("A role can be either buyer or seller");

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

export {registerUserService, authenticateUserService}