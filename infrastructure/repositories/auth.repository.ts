import { AppAuthRepository } from '@/core/contracts/repositories';
import { AppSignInModel, AppUser } from '@/core/models/domain';
import { AxiosInstance } from 'axios';

export class AuthRepository implements AppAuthRepository {
  constructor(private axios: AxiosInstance) {}

  private getSignInUrl() {
    return `/signIn`;
  }
  private getSignOutUrl() {
    return `/signOut`;
  }
  private getCheckAuthUrl() {
    return `/checkAuth`;
  }
  public async signIn(signInModel: AppSignInModel): Promise<AppUser> {
    try {
      const { data } = await this.axios.post<AppUser>(
        this.getSignInUrl(),
        signInModel
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject(error);
      }
    }
  }

  public async signOut(): Promise<void> {
    try {
      await this.axios.post(this.getSignOutUrl());
    } catch (error) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject(error);
      }
    }
  }

  public async checkAuth(): Promise<AppUser> {
    try {
      const { data } = await this.axios.post<AppUser>(this.getCheckAuthUrl());
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject(error);
      }
    }
  }
}
