import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const { Schema } = mongoose;

const videoSchema = new Schema({
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    view: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,  // Fixed typo
        ref: 'User'  // Fixed typo
    }
}, {
    timestamps: true  // Fixed typo
});
videoSchema.plugin(mongooseAggregatePaginate);
export default mongoose.model('Video', videoSchema);
