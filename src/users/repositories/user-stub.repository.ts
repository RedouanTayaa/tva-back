import { UserRepository } from './user.repository';
import { RegisterCommand } from '../usescases/register.usescase';
import { RegisterModel } from '../models/register.model';
import { LoginCommand } from '../usescases/login.usescase';
import { LoginModel } from '../models/login.model';
import * as argon2 from 'argon2';

export class UserStubRepository implements UserRepository {
  private users: any[];
  constructor() {
    this.users = [];
  }

  async register(params: RegisterCommand): Promise<RegisterModel> {
    if (!params.username || !params.password) {
      throw new Error('Les champs sont obligatoires');
    }

    if (params.password.length < 8) {
      throw new Error('Le mot de passe doit contenir au moins 8 caractères');
    }
    params.password = await argon2.hash(params.password);
    this.users = [...this.users, params];

    return new Promise((resolve) => resolve({ success: true }));
  }

  async login(params: LoginCommand): Promise<LoginModel> {
    const user = this.users.find(async (u) => {
      return u.username === params.username;
    });

    if (!user || !(await argon2.verify(user.password, params.password))) {
      throw new Error('Identifiant et/ou mot de passe incorrect(s)');
    }

    return new Promise((resolve) =>
      resolve({ token: 'token', refreshToken: 'refresh' }),
    );
  }
}
