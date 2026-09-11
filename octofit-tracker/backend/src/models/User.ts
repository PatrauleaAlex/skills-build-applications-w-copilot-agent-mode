import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  bio?: string;
  avatar?: string;
  joinDate: Date;
  totalWorkouts: number;
  totalCalories: number;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  avatar: { type: String },
  joinDate: { type: Date, default: Date.now },
  totalWorkouts: { type: Number, default: 0 },
  totalCalories: { type: Number, default: 0 }
});

export default mongoose.model<IUser>('User', userSchema);
