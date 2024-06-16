import AuthStatusInterface from './auth-status.interface';

export default interface SignUpServiceInterface extends AuthStatusInterface {
  email_confirmation?: AuthStatusInterface;
  tokens?: { accessToken: string; refreshToken: string },
}
