import { UserRepository } from '../repositories/user.repository';
import { RegisterCommand } from './register.usescase';
import { LoginModel } from '../models/login.model';
import { UseCasePromise } from '../../base/use-case';

export interface LoginCommand {
  username: string;
  password: string;
}

export class LoginUsescase implements UseCasePromise<LoginCommand, LoginModel> {
  constructor(private userRepository: UserRepository) {}
  public execute(command: RegisterCommand): Promise<LoginModel> {
    return this.userRepository.login(command);
  }
}
