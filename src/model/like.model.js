import mongoose ,{Schema}from mongoose;




const likeSchema = new Schema({
      video:{
            type:Schema.type.ObjectId,
            ref:'video'
      },
      comment:{
            type:Schema.type.ObjectId,
            ref:'comment'
      },
      tweet:{
            type:Schema.type.ObjectId,
            ref:'tweet'
      },
      likeBy:{
            
      }
})