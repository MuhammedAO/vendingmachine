export interface IUserCreate {
  role: string;
  username: string;
  password: string;
}
export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserUpdate {
  _id: string
  deposit?: number
  username?: string
  role?: string
}