import mongoose, { Document, Types } from 'mongoose';
export interface ILeaderboard extends Document {
    userId: Types.ObjectId;
    teamId?: Types.ObjectId;
    rank: number;
    totalCalories: number;
    totalWorkouts: number;
    weeklyCalories: number;
    lastUpdated: Date;
}
declare const _default: mongoose.Model<ILeaderboard, {}, {}, {}, Document<unknown, {}, ILeaderboard, {}, mongoose.DefaultSchemaOptions> & ILeaderboard & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILeaderboard>;
export default _default;
//# sourceMappingURL=Leaderboard.d.ts.map