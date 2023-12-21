import { Schema, Document, model } from "mongoose";

// Define the interface for the User document
interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Define the User schema
const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = model<IUser>("User", userSchema);

export default User;
