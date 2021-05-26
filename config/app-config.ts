import { AppConfig } from '@/core/models/config/app-config.model';
import devConfig from './app.config.development';
import prodConfig from './app.config.development';
import stagingConfig from './app.config.development';

const env = process.env.NODE_ENV;
let appConfig: AppConfig;

switch (env) {
  case 'development': {
    appConfig = devConfig;
    break;
  }
  case 'staging': {
    appConfig = stagingConfig;
    break;
  }
  case 'production': {
    appConfig = prodConfig;
    break;
  }
  default: {
    appConfig = prodConfig;
    break;
  }
}

export default appConfig;
