import AuthStatusInterface from './auth-status.interface';

export default interface SignInControllerInterface extends AuthStatusInterface {
  status: number;
  accessToken: string;
}
