import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';


const commentSchema= new Schema(
    {
        //TODO : comment feature
        content: {type:String,required:true},
        video:{type:Schema.type.ObjectId, ref:"video"},
        owner:{
            type:Schema.type.ObjectId, ref:"user"
        }
    },{
        timestamps:true
    }
);
commentSchema.plugin(mongooseAggregatePaginate);
export const Comment =  mongoose.model('Comment', commentSchema);
