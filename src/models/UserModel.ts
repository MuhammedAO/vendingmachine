import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  token: {
    type: String,
  },
  deposit: {
    type: Number,
  },
})

UserSchema.pre("save", async function (next): Promise<void> {
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.models.User || mongoose.model("User", UserSchema)
