import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = mongoose.connect("mongodb+srv://mhdcoding:test1234@cluster0.oes1p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {});
    console.log(`database connected: ${(await conn).connection.host}`);
  } catch (error: any) {
    console.log(error.message || error);

    // process.exit(1);
  }
};
export default connectDB;
