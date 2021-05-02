import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String },
  creationDate: { type: Date, required: true, default: Date.now },
  updateDate: { type: Date, required: true, default: Date.now },
});
