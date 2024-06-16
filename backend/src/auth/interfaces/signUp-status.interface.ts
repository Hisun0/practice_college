import AuthStatusInterface from './auth-status.interface';

export default interface SignUpStatus extends AuthStatusInterface {
  status: number;
  accessToken: string;
  email_confirmation: AuthStatusInterface;
}
