import appConfig from '@/config/app-config';
import axios, { AxiosInstance } from 'axios';
import {
  AppAuthRepository,
  AppLoggingRepository,
} from '@/core/contracts/repositories';
import { AppAuthService, AppLoggingService } from '@/core/contracts/services';
import { AuthService, LoggingService } from '@/core/services';
import {
  AuthRepository,
  LoggingRepository,
} from '@/infrastructure/repositories';
import { Request, Response } from 'express';
import cookies from 'isomorphic-cookie';

export interface AppLocator {
  axios: AxiosInstance;
  getLoggingService: () => AppLoggingService;
  getAuthService: () => AppAuthService;
}

export default class Locator implements AppLocator {
  public axios: AxiosInstance;

  private loggingRepo: AppLoggingRepository | undefined;
  private authRepo: AppAuthRepository | undefined;

  private loggingService: AppLoggingService | undefined;
  private authService: AppAuthService | undefined;

  constructor(isClient: boolean, request?: Request, response?: Response) {
    this.axios = axios.create({
      //baseURL: appConfig.apiEndpoint,
      timeout: 1000 * 60 * 10,
      withCredentials: true,
    });
    this.axios.interceptors.request.use((config) => {
      const cookie = isClient
        ? cookies.load('APP_SESSION')
        : cookies.load('APP_SESSION', request);
      if (!isClient) {
        console.log('making request from server', cookie);
        config.headers['Cookie'] = `APP_SESSION=${cookie}`;
      }
      return config;
    });
  }

  private getLoggingRepo(): AppLoggingRepository {
    if (!this.loggingRepo) {
      this.loggingRepo = new LoggingRepository(
        appConfig.loggingEnabled,
        appConfig.loggingLevel
      );
    }
    return this.loggingRepo;
  }

  private getAuthRepo(): AppAuthRepository {
    if (!this.authRepo) {
      this.authRepo = new AuthRepository(this.axios);
    }
    return this.authRepo;
  }

  public getLoggingService(): AppLoggingService {
    if (!this.loggingService) {
      this.loggingService = new LoggingService(this.getLoggingRepo());
    }
    return this.loggingService;
  }

  public getAuthService(): AppAuthService {
    if (!this.authService) {
      this.authService = new AuthService(
        this.getAuthRepo(),
        this.getLoggingService()
      );
    }
    return this.authService;
  }
}
