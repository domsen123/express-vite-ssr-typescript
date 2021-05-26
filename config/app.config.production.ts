import {
  AppConfig,
  LoggingLevelEnum,
} from '@/core/models/config/app-config.model';

const config: AppConfig = {
  port: 3000,
  apiEndpoint: 'https://zoe.juno-prod.ved.grp/_api',
  loggingEnabled: false,
  loggingLevel: LoggingLevelEnum.Debug,
};

export default config;
