import type { IronSessionOptions } from 'iron-session';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import { LoginPost } from '../src/definitions/Auth';

export const sessionOptions: IronSessionOptions = {
  password: process.env.COOKIE_PASSWORD as string,
  cookieName: 'cormeum/auth',
  cookieOptions: {
    // Set false for now until upgrade to https
    secure: false,
    // secure: process.env.NODE_ENV === 'production',
  },
};

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}

declare module 'iron-session' {
  interface IronSessionData {
    auth?: LoginPost;
  }
}
