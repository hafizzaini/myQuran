import { NextApiRequest, NextApiResponse } from 'next';
import { api, clientApi } from '../../../../lib/api';
import { AxiosResponse, AxiosError } from 'axios';
import { withSessionRoute } from '../../../../lib/session';
import { LoginPost } from '../../../definitions/Auth';

async function LoginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body;

  try {
    const response: AxiosResponse<LoginPost> = await api.post('/auth/login', {
      username,
      password,
    });
    req.session.auth = response.data;
    if (response.data.success) {
      await req.session.save();
      res.send({ data: response.data });
    } else {
      // Control is passed to catch block, data.reason is passed and used as error message.
      throw new Error(response.data.reason);
    }
  } catch (error) {
    // return message can be an exception (user-defined) or a machine error
    const message = (error as AxiosError).message;
    res.status(500).send(message);
  }
}

export default withSessionRoute(LoginRoute);
