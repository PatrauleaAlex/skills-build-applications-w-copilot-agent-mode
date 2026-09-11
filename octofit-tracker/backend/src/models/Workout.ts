import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  userId: Types.ObjectId;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  exercises: string[];
  caloriesBurned: number;
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  duration: { type: Number, required: true },
  exercises: [{ type: String }],
  caloriesBurned: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IWorkout>('Workout', workoutSchema);
