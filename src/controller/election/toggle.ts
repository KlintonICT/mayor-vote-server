import ElectionStatusModel from '../../models/electionStatus';
import CandidateModel from '../../models/candidate';

import { getElectionStatus } from '../../utils';

const toggle = async (_req: any, res: any) => {
  try {
    const { _id, enable } = await getElectionStatus();
    let response = {
      status: 'ok',
      enable: !enable,
    };

    await ElectionStatusModel.updateOne({ _id }, { enable: !enable });

    if (enable) {
      response = await CandidateModel.find()
        .select({ _id: 0, id: 1, votedCount: 1 })
        .exec();
    }

    return res.status(200).json(response);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Oops! Something went wrong!' });
  }
};

export default toggle;
