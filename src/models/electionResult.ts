import { model, Schema } from 'mongoose';

const ElectionResultSchema = new Schema(
  {
    candidate: { type: Schema.Types.ObjectId, ref: 'Candidate' },
    percentage: String,
  },
  { timestamps: true }
);

export default model('ElectionResult', ElectionResultSchema);
