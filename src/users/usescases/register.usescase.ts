import { UserRepository } from '../repositories/user.repository';
import { RegisterModel } from '../models/register.model';
import { UseCasePromise } from '../../base/use-case';

export interface RegisterCommand {
  username: string;
  password: string;
}

export class RegisterUsescase
  implements UseCasePromise<RegisterCommand, RegisterModel>
{
  constructor(private userRepository: UserRepository) {}
  public execute(command: RegisterCommand): Promise<RegisterModel> {
    return this.userRepository.register(command);
  }
}
