import mongoose, { Document, Types } from 'mongoose';
export interface IActivity extends Document {
    userId: Types.ObjectId;
    type: string;
    duration: number;
    calories: number;
    distance?: number;
    intensity: 'low' | 'moderate' | 'high';
    timestamp: Date;
    description?: string;
}
declare const _default: mongoose.Model<IActivity, {}, {}, {}, Document<unknown, {}, IActivity, {}, mongoose.DefaultSchemaOptions> & IActivity & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IActivity>;
export default _default;
//# sourceMappingURL=Activity.d.ts.map