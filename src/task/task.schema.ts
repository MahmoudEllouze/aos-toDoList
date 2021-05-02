import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  isDone: { type: Boolean },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  creationDate: { type: Date, required: true, default: Date.now },
});
