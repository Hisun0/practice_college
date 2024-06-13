export default interface AuthStatusInterface {
  success: boolean;
  message: string;
  tokens?: { accessToken: string; refreshToken: string };
}
