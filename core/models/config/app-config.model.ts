export interface AppConfig {
  port: number;
  apiEndpoint: string;
  avatarEndpointUrl?: string;
  loggingEnabled: boolean;
  loggingLevel: LoggingLevelEnum;
}

export enum LoggingLevelEnum {
  Log = 'Log',
  Warning = 'Warning',
  Error = 'Error',
  Debug = 'Debug',
}
