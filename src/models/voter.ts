import { model, Schema } from 'mongoose';

const VoterSchema = new Schema(
  {
    nationalId: String,
  },
  { timestamps: true }
);

export default model('Voter', VoterSchema);
