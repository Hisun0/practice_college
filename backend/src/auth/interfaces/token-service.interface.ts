import AuthStatusInterface from './auth-status.interface';

export default interface TokenServiceInterface extends AuthStatusInterface {
  tokens?: { accessToken: string; refreshToken: string };
}
