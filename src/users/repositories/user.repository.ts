import { RegisterCommand } from '../usescases/register.usescase';
import { RegisterModel } from '../models/register.model';
import { LoginCommand } from '../usescases/login.usescase';
import { LoginModel } from '../models/login.model';

export abstract class UserRepository {
  abstract register(params: RegisterCommand): Promise<RegisterModel>;
  abstract login(params: LoginCommand): Promise<LoginModel>;
  // abstract changePassword(params: LoginCommand): Promise<LoginModel>;
  // abstract changeConfig(params: LoginCommand): Promise<LoginModel>;
}
