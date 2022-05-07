import CandidateModel from '../../models/candidate';

const list = async (_req: any, res: any) => {
  try {
    const candidates = await CandidateModel.find()
      .select({
        _id: 0,
        id: 1,
        name: 1,
        dob: 1,
        bioLink: 1,
        policy: 1,
        imageURL: 1,
        votedCount: 1,
      })
      .sort('id')
      .collation({ locale: 'en_US', numericOrdering: true })
      .exec();

    return res.status(200).json(candidates);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Oops! Something went wrong!' });
  }
};

export default list;
