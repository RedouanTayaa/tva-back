import { createUserFixtures } from './user.fixtures';

describe('Register', () => {
  let registerFixtures: any;

  beforeEach(() => {
    registerFixtures = createUserFixtures();
  });

  it('should register successfully', async () => {
    await registerFixtures.whenUserIsCreated({
      username: 'test',
      password: 'test12345',
    });
    registerFixtures.thenShouldRegisterSuccessfully();
  });

  it('should register failed no password', async () => {
    await registerFixtures.whenUserIsCreated({
      username: 'test',
    });
    registerFixtures.thenShouldRegisterFailed('Les champs sont obligatoires');
  });

  it('should register failed password with lt 6 characters', async () => {
    await registerFixtures.whenUserIsCreated({
      username: 'test',
      password: 'test',
    });
    registerFixtures.thenShouldRegisterFailed(
      'Le mot de passe doit contenir au moins 8 caractères',
    );
  });
});
