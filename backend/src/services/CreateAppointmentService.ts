import { startOfHour } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findSameDate = this.appointmentRepository.findByDate(appointmentDate);

    if (findSameDate) {
      throw Error('Already exists appointment on this date');
    }

    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
