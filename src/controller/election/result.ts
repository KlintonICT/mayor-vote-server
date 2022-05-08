import ElectionResultModel from '../../models/electionResult';

const result = async (_req: any, res: any) => {
  try {
    const electionResult = await ElectionResultModel.find()
      .populate(
        'candidate',
        '-_id id name dob bioLink policy imageURL votedCount'
      )
      .select('-_id candidate percentage');

    const extractedCandidate = electionResult
      .map(({ candidate, percentage }: any) => ({
        id: candidate.id,
        name: candidate.name,
        dob: candidate.dob,
        bioLink: candidate.bioLink,
        policy: candidate.policy,
        imageURL: candidate.imageURL,
        votedCount: candidate.imageURL,
        percentage,
      }))
      .sort((a: any, b: any) => a.id - b.id);

    return res.status(200).json(extractedCandidate);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Oops! Something went wrong!' });
  }
};

export default result;
