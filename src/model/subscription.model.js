import mongoose, { Schema } from 'mongoose';

// Define the subscription schema with some typical fields
const subscriptionSchema = new Schema({
  subscriber: {
    type: Schema.Types.ObjectId, // one who is subscribing
    ref: 'User', // Refers to the User model
    required: true
  },
  channel: {
    type: Schema.Types.ObjectId, // one to whom the subscriber is subscribing
    ref: 'User', // Refers to the User model
    required: true
  }
}, {
  timestamps: true
});

// Create the Subscription model
const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
