import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const date = new Date();

    const appointment = await createAppointment.execute({
      provider_id: '123123',
      date,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments in the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const date = new Date();

    await createAppointment.execute({
      provider_id: '123123',
      date,
    });

    expect(
      createAppointment.execute({
        provider_id: '123123',
        date,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
