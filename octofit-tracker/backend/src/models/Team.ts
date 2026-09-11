import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description?: string;
  members: Types.ObjectId[];
  createdAt: Date;
  totalCalories: number;
  logo?: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  totalCalories: { type: Number, default: 0 },
  logo: { type: String }
});

export default mongoose.model<ITeam>('Team', teamSchema);
