import { IUserCreate, IUserUpdate } from '../interface/IUser';
import UserModel from "../models/UserModel"

export const createUserDao = async (userData: IUserCreate) =>
  await UserModel.create(userData)

export const getUserByUsername = async (username: string) =>
  UserModel.findOne({ username })

  export const updateUserDao = async (userData: IUserUpdate) => {
    return UserModel.findOneAndUpdate({ _id: userData._id }, userData, {
      new: true,
    })
  }

export const getUserByIdDao = async (id: string) => UserModel.findById(id)

export const deleteUserByIdDao = async (id: string) => UserModel.deleteOne({_id: id})
