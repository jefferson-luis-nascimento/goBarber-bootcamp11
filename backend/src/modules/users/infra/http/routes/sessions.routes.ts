import { Router } from 'express';

import CreateSessionService from '@modules/users/services/CreateSessionService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const userRepository = new UserRepository();

  const createSession = new CreateSessionService(userRepository);

  const { user, token } = await createSession.execute({ email, password });

  return response.json({ user, token });
});

export default sessionsRouter;
