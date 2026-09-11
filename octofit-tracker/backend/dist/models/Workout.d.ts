import mongoose, { Document, Types } from 'mongoose';
export interface IWorkout extends Document {
    userId: Types.ObjectId;
    name: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: number;
    exercises: string[];
    caloriesBurned: number;
    createdAt: Date;
}
declare const _default: mongoose.Model<IWorkout, {}, {}, {}, Document<unknown, {}, IWorkout, {}, mongoose.DefaultSchemaOptions> & IWorkout & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IWorkout>;
export default _default;
//# sourceMappingURL=Workout.d.ts.map