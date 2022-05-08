import ElectionStatusModel from '../models/electionStatus';

export const getElectionStatus = async () =>
  ElectionStatusModel.findOne().select({ enable: 1 }).exec();

export const isNationalID = (id: string): boolean => {
  let [i, sum] = [0, 0];

  for (i = 0; i < 12; i++) {
    sum += parseInt(id.charAt(i)) * (13 - i);
  }
  const check = (11 - (sum % 11)) % 10;

  return check === parseInt(id.charAt(12));
};
