import express from "express"
import { authenticateUserController, deleteUserProfileController, getUserProfileController, registerUserController, resetUserDepositController, updateUserProfileController, userAccountDepositController } from "../controllers/userController"
import { authGuard } from "../middleware/authMiddleware"


const router = express.Router()

router.post("/register", registerUserController)
router.post("/login", authenticateUserController)
router
  .route("/profile")
  .get(authGuard, getUserProfileController)
  .put(authGuard, updateUserProfileController)
router.delete("/profile/delete", authGuard, deleteUserProfileController)

//Deposit
router.put("/deposit", authGuard, userAccountDepositController)
router.put("/deposit/reset", authGuard, resetUserDepositController)

export default router
