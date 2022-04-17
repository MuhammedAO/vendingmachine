import asyncHandler from "express-async-handler"
import {
  authenticateUserService,
  deleteUserProfileService,
  getUserProfileService,
  registerUserService,
  resetUserDepositService,
  updateUserProfileService,
  userAccountDepositService,
} from "../services/userService"

const registerUserController = asyncHandler(
  async (req, res) => await registerUserService(req, res)
)

const authenticateUserController = asyncHandler(
  async (req, res) => await authenticateUserService(req, res)
)
const getUserProfileController = asyncHandler(
  async (req, res) => await getUserProfileService(req, res)
)
const updateUserProfileController = asyncHandler(
  async (req, res) => await updateUserProfileService(req, res)
)
const deleteUserProfileController = asyncHandler(
  async (req, res) => await deleteUserProfileService(req, res)
)
const userAccountDepositController = asyncHandler(
  async (req, res) => await userAccountDepositService(req, res)
)

const resetUserDepositController = asyncHandler(
  async (req, res) => await resetUserDepositService(req, res)
)

export {
  registerUserController,
  authenticateUserController,
  getUserProfileController,
  updateUserProfileController,
  deleteUserProfileController,
  userAccountDepositController,
  resetUserDepositController
}
