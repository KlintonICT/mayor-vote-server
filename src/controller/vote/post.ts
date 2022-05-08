import VoterModel from '../../models/voter';
import CandidateModel from '../../models/candidate';
import ElectionResultModel from '../../models/electionResult';
import { getElectionStatus } from '../../utils';

const post = async (req: any, res: any) => {
  try {
    const { nationalId, candidateId } = req.body;
    const [voter, { enable }] = await Promise.all([
      VoterModel.findOne({ nationalId }),
      getElectionStatus(),
    ]);

    if (!enable) {
      return res.status(200).json({
        status: 'error',
        message: 'Election is closed',
      });
    }

    if (voter !== null) {
      return res.status(200).json({
        status: 'error',
        message: 'Already voted',
      });
    } else {
      // store vote user
      await VoterModel.create({ nationalId });
    }

    // update votedCount for current candidate
    const { _id, votedCount } = await CandidateModel.findOne({
      id: candidateId,
    });
    await CandidateModel.updateOne({ _id }, { votedCount: votedCount + 1 });

    // find totalVotes for all candidates
    const candidates = await CandidateModel.find()
      .select({ _id: 1, votedCount: 1 })
      .exec();
    const totalVotes = candidates.reduce(
      (accumulator: any, candidate: any) => candidate.votedCount + accumulator,
      0
    );

    // calculate vote result for all candidates
    const voteResultData = candidates.map((candidate: any) => {
      const percentage = `${parseFloat(
        ((candidate.votedCount * 100) / totalVotes).toFixed(2)
      )}%`;
      return { candidate: candidate._id, percentage };
    });

    // store vote result
    const electionResult = (await ElectionResultModel.find()) || [];
    if (electionResult.length === 0) {
      await ElectionResultModel.insertMany(voteResultData);
    } else {
      await Promise.all(
        voteResultData.map(async ({ candidate, percentage }: any) => {
          await ElectionResultModel.updateOne({ candidate }, { percentage });
        })
      );
    }

    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Oops! Something went wrong!' });
  }
};

export default post;
