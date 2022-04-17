import { Request, Response } from "express"
import {
  getUserByIdDao,
  getUserByUsername,
  createUserDao,
  deleteUserByIdDao,
} from "../dao/userDAO"
import generateToken from "../utils/generateToken"
import { updateUserDao } from "../dao/userDAO"
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/userValidation"


const authenticateUserService = async (req: Request, res: Response) => {
  const { username, password } = req.body
  await loginUserValidation(req.body)
  const user = await getUserByUsername(username)

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
}

const registerUserService = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { role, username, password } = req.body

  if (!(role === "seller" || role === "buyer"))
    throw new Error("A role can be either buyer or seller")

  await registerUserValidation(req.body)

  const userExists = await getUserByUsername(username)

  if (userExists) {
    res.status(400)
    throw new Error(" user already exists")
  }

  const user = await createUserDao({ role, username, password })

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
    })
  } else {
    res.status(400)
    throw new Error("invalid user data")
  }
}

const getUserProfileService = async (req: any, res: Response) => {
  const user = await getUserByIdDao(req.user._id)
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
}

const updateUserProfileService = async (req: any, res: Response) => {
  const user = await getUserByIdDao(req.user._id)

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
}

const deleteUserProfileService = async (req: any, res: Response) => {
  const user = await getUserByIdDao(req.user._id)
  if (user) {
    await deleteUserByIdDao(req.user._id)
    res.json({ message: "User deleted" })
  } else {
    res.status(404)
    throw new Error("user not found")
  }
}

export const acceptableCoins = [5, 10, 20, 50, 100]

const userAccountDepositService = async (req: any, res: Response) => {
  const { deposit } = req.body

  if (!acceptableCoins.includes(deposit))
    throw new Error("You can only deposit 5,10,20,50,100 cents")

  const user = await getUserByIdDao(req.user._id)
  const { _id, role } = user

  if (role !== "buyer") throw new Error("Only buyers can make deposits!")

  let userDeposit = user.deposit

  const updatedDeposit = (userDeposit += deposit)

  if (user) {
    await updateUserDao({ _id, deposit: updatedDeposit })
    res.json({
      message: `Your vending account has been deposited with ${deposit} cents`,
    })
  } else {
    res.status(400)
    throw new Error("Failed to add deposit")
  }
}

const resetUserDepositService = async (req: any, res: Response) => {
  const user = await getUserByIdDao(req.user._id)
  const { _id, role } = user
  if (role !== "buyer") throw new Error("Only buyers reset their deposits!")

  if (user) {
    await updateUserDao({ _id, deposit: 0 })
    res.json({ message: "Your deposit has been reset!" })
  } else {
    res.status(404)
    throw new Error("user not found")
  }
}

export {
  registerUserService,
  authenticateUserService,
  getUserProfileService,
  updateUserProfileService,
  deleteUserProfileService,
  userAccountDepositService,
  resetUserDepositService,
}
