import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  userId: Types.ObjectId;
  type: string;
  duration: number; // in minutes
  calories: number;
  distance?: number; // in km
  intensity: 'low' | 'moderate' | 'high';
  timestamp: Date;
  description?: string;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true }, // e.g., running, cycling, swimming
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  distance: { type: Number },
  intensity: { type: String, enum: ['low', 'moderate', 'high'], required: true },
  timestamp: { type: Date, default: Date.now },
  description: { type: String }
});

export default mongoose.model<IActivity>('Activity', activitySchema);
