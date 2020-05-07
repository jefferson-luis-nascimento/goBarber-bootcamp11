import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateSessionService from './CreateSessionService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateSession', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const createSession = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const session = await createSession.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(session).toHaveProperty('token');
    expect(session.user).toEqual(user);
  });

  it('should not be able to create a session with invalid email', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const createSession = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      createSession.execute({
        email: 'johndoe1@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a session with invalid password', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const createSession = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      createSession.execute({
        email: 'johndoe@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
