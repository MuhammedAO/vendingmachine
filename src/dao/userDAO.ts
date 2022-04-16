import { IUserCreate } from "../interface/IUser"
import UserModel from "../models/UserModel"

export const createUserDao = async (userData: IUserCreate) =>
  await UserModel.create(userData)

export const getUserByUsername = async (username: string) =>
  UserModel.findOne({ username })

export const getUserByEmail = async (email: string) =>
  UserModel.findOne({ email })

export const getUserByIdDao = async (id: string) => UserModel.findById(id)
