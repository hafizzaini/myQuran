import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../../../lib/session';

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.redirect('/login').end();
}

export default withSessionRoute(logoutRoute);
