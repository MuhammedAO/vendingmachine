import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    amountAvailable: {
      type: Number
    },
    cost: {
      type: Number
    },
    productName: {
      type: String
    },
    sellerId: {
      type: String
    }
  }
)

export default mongoose.models.Product || mongoose.model("User", ProductSchema)
