import {
  AppConfig,
  LoggingLevelEnum,
} from '@/core/models/config/app-config.model';

const config: AppConfig = {
  loggingEnabled: false,
  loggingLevel: LoggingLevelEnum.Log,
};

export default config;
