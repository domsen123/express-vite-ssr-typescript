import { AppLoggingService } from '@/core/contracts/services';
import { AppLoggingRepository } from '@/core/contracts/repositories';

export class LoggingService implements AppLoggingService {
  constructor(private loggingRepo: AppLoggingRepository) {}

  public log(message: string) {
    this.loggingRepo.log(message);
  }

  public warn(message: string) {
    this.loggingRepo.warn(message);
  }

  public error(message: string) {
    this.loggingRepo.error(message);
  }
}
