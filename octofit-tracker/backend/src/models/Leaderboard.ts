import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILeaderboard extends Document {
  userId: Types.ObjectId;
  teamId?: Types.ObjectId;
  rank: number;
  totalCalories: number;
  totalWorkouts: number;
  weeklyCalories: number;
  lastUpdated: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  rank: { type: Number, required: true },
  totalCalories: { type: Number, default: 0 },
  totalWorkouts: { type: Number, default: 0 },
  weeklyCalories: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
