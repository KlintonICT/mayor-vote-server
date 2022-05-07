import { model, Schema } from 'mongoose';

const CandidateSchema = new Schema(
  {
    id: String,
    name: String,
    dob: String,
    bioLink: String,
    policy: String,
    imageURL: String,
    votedCount: Number,
  },
  { timestamps: true }
);

export default model('Candidate', CandidateSchema);
