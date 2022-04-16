import expressAsyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import UserModel from "../models/UserModel"

interface JwtPayload {
  id: string
}

const authGuard = expressAsyncHandler(
  async (req: any, res, next): Promise<void> => {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1]

        const { id } = jwt.verify(token, "Secret") as JwtPayload

 

        req.user = await UserModel.findById(id).select("-password")

        if(!req.user) throw new Error()

        next()
      } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error("Not authorized, token failed")
      }
    }

    if (!token) {
      res.status(401)
      throw new Error("Unauthorized")
    }
  }
)

export { authGuard }
