import { AppLoggingRepository } from '@/core/contracts/repositories';
import { LoggingLevelEnum } from '@/core/models/config/app-config.model';

interface LogEntry {
  message: string;
  level: LoggingLevelEnum;
}

export class LoggingRepository implements AppLoggingRepository {
  private logs: LogEntry[] = [];
  constructor(
    private loggingEnabled: boolean,
    private loggingLevel: LoggingLevelEnum
  ) {}

  public log(message: string) {
    if (this.loggingEnabled && this.loggingLevel === LoggingLevelEnum.Debug) {
      this.logs.push({ message: message, level: LoggingLevelEnum.Log });
      console.log(`[info]: ${message}`);
    }
  }

  public warn(message: string) {
    if (this.loggingEnabled && this.loggingLevel === LoggingLevelEnum.Debug) {
      this.logs.push({ message: message, level: LoggingLevelEnum.Warning });
      console.log(`[warn]: ${message}`);
    }
  }

  public error(message: string) {
    if (this.loggingEnabled) {
      this.logs.push({ message: message, level: LoggingLevelEnum.Error });
      console.log(`[error]: ${message}`);
    }
  }
}
