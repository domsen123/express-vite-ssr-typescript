import { ref } from 'vue';
import { AppAuthRepository } from '../contracts/repositories';
import {
  AppAuthService,
  AppLoggingService,
  AppStateService,
} from '../contracts/services';
import { AppUser, AppSignInModel, AppUserWithAvatar } from '../models/domain';

export class AuthService implements AppAuthService {
  constructor(
    private authRepo: AppAuthRepository,
    private loggingService: AppLoggingService,
    private stateService: AppStateService
  ) {}

  private setCurrentUser(user: AppUser) {
    const appUser: AppUserWithAvatar = {
      ...user,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    };
    this.stateService.setStateItem('currentUser', appUser);
  }
  public getCurrentUser(): AppUser | undefined {
    throw new Error('Method not implemented.');
  }
  public isLoggedIn(): boolean {
    throw new Error('Method not implemented.');
  }
  public async signIn(signInModel: AppSignInModel): Promise<AppUser> {
    try {
      const user = await this.authRepo.signIn(signInModel);
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      this.loggingService.error(error.message);
      return Promise.reject(error);
    }
  }

  public async checkAuth(): Promise<AppUser> {
    try {
      const user = await this.authRepo.checkAuth();
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      this.loggingService.error(error.message);
      return Promise.reject(error);
    }
  }
  public signOut(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
