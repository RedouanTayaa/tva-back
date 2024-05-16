import { createUserFixtures } from './user.fixtures';

describe('Login', () => {
  let loginFixtures: any;

  beforeEach(async () => {
    loginFixtures = createUserFixtures();
    await loginFixtures.whenUserIsCreated({
      username: 'admin',
      password: 'test12345',
    });
    loginFixtures.thenShouldRegisterSuccessfully();
  });

  it('should login successfully', async () => {
    await loginFixtures.whenUserLogin({
      username: 'admin',
      password: 'test12345',
    });
    loginFixtures.thenShouldLoginSuccessfully();
  });

  it('should login failed', async () => {
    await loginFixtures.whenUserLogin({
      username: 'admin',
      password: 'admin123',
    });
    loginFixtures.thenShouldLoginFailed();
  });
});
