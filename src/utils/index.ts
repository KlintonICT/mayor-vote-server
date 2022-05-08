import ElectionStatusModel from '../models/electionStatus';

export const getElectionStatus = async () =>
  ElectionStatusModel.findOne().select({ enable: 1 }).exec();
