import { NextApiRequest, NextApiResponse } from 'next';
import { api } from '../../../../lib/api';
import { withSessionRoute } from '../../../../lib/session';
import { AxiosResponse, AxiosError } from 'axios';

async function CheckRoute(req: NextApiRequest, res: NextApiResponse) {
  const { auth } = await req.body;
  if (auth === undefined) {
    return res.status(500).end();
  }

  const body = {
    token: auth.token,
    scopes: [],
  };

  try {
    const response: AxiosResponse<Boolean> = await api.post('/auth/check', body);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
}

export default withSessionRoute(CheckRoute);
