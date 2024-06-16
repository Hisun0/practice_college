import AuthStatusInterface from './auth-status.interface';

export default interface SignInServiceInterface extends AuthStatusInterface {
  accessToken?: string;
}
