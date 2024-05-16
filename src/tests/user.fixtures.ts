import {
  RegisterCommand,
  RegisterUsescase,
} from '../users/usescases/register.usescase';
import { UserStubRepository } from '../users/repositories/user-stub.repository';
import { LoginCommand, LoginUsescase } from '../users/usescases/login.usescase';
import { RegisterModel } from '../users/models/register.model';
import { LoginModel } from '../users/models/login.model';

export const createUserFixtures = () => {
  let register: RegisterModel;
  let login: LoginModel;
  let errorMessage: string;
  const userRepository = new UserStubRepository();
  const registerUseCase = new RegisterUsescase(userRepository);
  const loginUseCase = new LoginUsescase(userRepository);

  return {
    whenUserIsCreated: async (registerCommand: RegisterCommand) => {
      return registerUseCase
        .execute(registerCommand)
        .then((user) => {
          register = user;
        })
        .catch((error) => {
          errorMessage = error.message;
        });
    },
    whenUserLogin: async (loginCommand: LoginCommand) => {
      return loginUseCase
        .execute(loginCommand)
        .then((user) => {
          login = user;
        })
        .catch((error) => {
          errorMessage = error.message;
        });
    },
    thenShouldRegisterSuccessfully: () => {
      expect(register).toEqual({
        success: true,
      });
    },
    thenShouldRegisterFailed: (message: string) => {
      expect(errorMessage).toEqual(message);
    },
    thenShouldLoginSuccessfully: () => {
      expect(login).toEqual({ token: 'token', refreshToken: 'refresh' });
    },
    thenShouldLoginFailed: () => {
      expect(errorMessage).toEqual(
        'Identifiant et/ou mot de passe incorrect(s)',
      );
    },
  };
};
