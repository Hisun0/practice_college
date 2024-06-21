import AuthStatusInterface from './auth-status.interface';
import { UserEntity } from '../../users/entities/user.entity';

export default interface SignInServiceInterface extends AuthStatusInterface {
  user?: UserEntity;
  accessToken?: string;
}
