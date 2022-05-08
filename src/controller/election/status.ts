import { getElectionStatus } from '../../utils';

const status = async (_req: any, res: any) => {
  try {
    const { enable } = await getElectionStatus();

    return res.status(200).json({ enable });
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Oops! Something went wrong!' });
  }
};

export default status;
