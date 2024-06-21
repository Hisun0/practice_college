import AuthStatusInterface from './auth-status.interface';
import { UserEntity } from '../../users/entities/user.entity';

export default interface SignUpStatus extends AuthStatusInterface {
  status: number;
  user: UserEntity;
  accessToken: string;
  email_confirmation: AuthStatusInterface;
}
