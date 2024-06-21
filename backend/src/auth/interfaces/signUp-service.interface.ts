import AuthStatusInterface from './auth-status.interface';
import { UserEntity } from '../../users/entities/user.entity';

export default interface SignUpServiceInterface extends AuthStatusInterface {
  email_confirmation?: AuthStatusInterface;
  user?: UserEntity;
  tokens?: { accessToken: string; refreshToken: string };
}
