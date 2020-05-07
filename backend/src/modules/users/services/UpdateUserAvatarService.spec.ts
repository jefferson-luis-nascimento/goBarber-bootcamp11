import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import CreateUserService from './CreateUserService';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able the user update his avatar image', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
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

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    const userAvatar = await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'nome do avatar',
    });

    expect(userAvatar.avatar).toBe('nome do avatar');
  });

  it('should not be able to update to non-exists user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        user_id: '65465646',
        avatarFilename: 'nome do avatar',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when update new avatar', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const fakeHashProvider = new FakeHashProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'nome do avatar',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'novo nome do avatar',
    });

    expect(deleteFile).toHaveBeenCalledWith('nome do avatar');

    expect(user.avatar).toBe('novo nome do avatar');
  });
});
