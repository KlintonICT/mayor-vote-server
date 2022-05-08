import { model, Schema } from 'mongoose';

const ElectionStatusSchema = new Schema(
  {
    enable: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model('ElectionStatus', ElectionStatusSchema);
