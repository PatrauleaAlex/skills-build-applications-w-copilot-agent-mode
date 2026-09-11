import mongoose, { Document, Types } from 'mongoose';
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
declare const _default: mongoose.Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export default _default;
//# sourceMappingURL=User.d.ts.map