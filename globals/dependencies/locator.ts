import appConfig from '@/config/app-config';
import axios, { AxiosInstance } from 'axios';
import {
  AppAuthRepository,
  AppLoggingRepository,
  AppStorageRepository,
} from '@/core/contracts/repositories';
import {
  AppAuthService,
  AppLoggingService,
  AppStateService,
  AppStorageService,
} from '@/core/contracts/services';
import {
  AuthService,
  LoggingService,
  StateService,
  StorageService,
} from '@/core/services';
import {
  AuthRepository,
  LoggingRepository,
} from '@/infrastructure/repositories';
import { Request, Response } from 'express';
import cookies from 'isomorphic-cookie';
import { StorageRepository } from '@/infrastructure/local';
import { USER_TOKEN } from '@/core/constants';

export interface AppLocator {
  axios: AxiosInstance;
  getLoggingService: () => AppLoggingService;
  getStorageService: () => AppStorageService;
  getStateService: () => AppStateService;
  getAuthService: () => AppAuthService;
}

export default class Locator implements AppLocator {
  public axios: AxiosInstance;

  private loggingRepo: AppLoggingRepository | undefined;
  private storageRepo: AppStorageRepository | undefined;
  private authRepo: AppAuthRepository | undefined;

  private loggingService: AppLoggingService | undefined;
  private storageService: AppStorageService | undefined;

  private stateService: AppStateService | undefined;
  private authService: AppAuthService | undefined;

  constructor(isClient: boolean, request?: Request, response?: Response) {
    this.axios = axios.create({
      baseURL: appConfig.apiEndpoint,
      timeout: 1000 * 60 * 10,
      withCredentials: true,
    });
    this.axios.interceptors.request.use((config) => {
      if (!isClient) {
        const cookie = cookies.load(USER_TOKEN, request);
        config.headers['Cookie'] = `USER_TOKEN=${cookie}`;
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

  private getStorageRepo(): AppStorageRepository {
    if (!this.storageRepo) {
      this.storageRepo = new StorageRepository();
    }
    return this.storageRepo;
  }

  private getAuthRepo(): AppAuthRepository {
    if (!this.authRepo) {
      this.authRepo = new AuthRepository(this.axios);
    }
    return this.authRepo;
  }

  // SERVICES

  public getLoggingService(): AppLoggingService {
    if (!this.loggingService) {
      this.loggingService = new LoggingService(this.getLoggingRepo());
    }
    return this.loggingService;
  }

  public getStorageService(): AppStorageService {
    if (!this.storageService) {
      this.storageService = new StorageService(this.getStorageRepo());
    }
    return this.storageService;
  }

  public getStateService(): AppStateService {
    if (!this.stateService) {
      this.stateService = new StateService(this.getStorageService());
    }
    return this.stateService;
  }

  public getAuthService(): AppAuthService {
    if (!this.authService) {
      this.authService = new AuthService(
        this.getAuthRepo(),
        this.getLoggingService(),
        this.getStateService()
      );
    }
    return this.authService;
  }
}
