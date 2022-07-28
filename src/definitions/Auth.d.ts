export interface LoginPost {
  success: boolean;
  reason: string;
  token: string;
  expiry: number;
}

export interface LoginState {
  name: string;
  email: string;
  status: 'idle' | 'loading' | 'loggedIn';
}

export interface LoginBody {
  username: string;
  password: string;
}
