import VoterModel from '../../models/voter';
import { isNationalID } from '../../utils';

const status = async (req: any, res: any) => {
  try {
    const { nationalId } = req.body;

    if (!isNationalID(nationalId)) {
      return res.status(200).json({ status: false });
    }

    const voter = await VoterModel.findOne({ nationalId });

    return res.status(200).json({ status: voter === null });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Oops! Something went wrong!' });
  }
};

export default status;
