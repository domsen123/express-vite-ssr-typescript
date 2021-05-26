import {
  AppConfig,
  LoggingLevelEnum,
} from '@/core/models/config/app-config.model';

const config: AppConfig = {
  port: 3000,
  apiEndpoint: 'http://localhost:3000/_api',
  loggingEnabled: true,
  loggingLevel: LoggingLevelEnum.Debug,
};

export default config;
