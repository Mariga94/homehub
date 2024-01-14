import mongoose, { Schema, Document, model } from "mongoose";

// Define the interface for the User document
export interface IUser extends Document {
  fullName: string;
  email: string;
  title: string;
  phoneNumber: string;
  password: string;
  createdAt: Date;
  personalInfo: string;
  properties: [{}]
}

// Define the User schema
const userSchema = new Schema<IUser>({
  fullName: { type: String, required: false },
  title: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  personalInfo: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  properties: [{ type: Schema.Types.ObjectId, ref: 'Property' }]
});

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
