import mongoose, { Schema } from "mongoose";

// Define the subscription schema with some typical fields
const subscriptionSchema = new Schema({
      subscriber:{
            type: Schema.Types.ObjectId,//one who is subscribing
            ref:"Users"
      },
      channel:{
            type:Schema.Types.ObjectId,//one to whom subscriber is subscripting 
            ref:"User"

      }
},{
      timestamps:true
})

// Create the Subscription model
const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
