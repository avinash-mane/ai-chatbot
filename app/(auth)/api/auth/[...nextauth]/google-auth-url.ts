import { NextApiRequest, NextApiResponse } from 'next';
import { getAuthUrl } from '../../../../utils/googleAuth';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const authUrl = getAuthUrl();
  res.status(200).send(authUrl);
};
