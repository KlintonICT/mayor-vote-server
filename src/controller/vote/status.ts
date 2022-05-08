import VoterModel from '../../models/voter';

const status = async (req: any, res: any) => {
  try {
    const { nationalId } = req.body;
    const voter = await VoterModel.findOne({ nationalId });

    return res.status(200).json({ status: !!voter });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Oops! Something went wrong!' });
  }
};

export default status;
