import { computed, ComputedRef, ref } from 'vue';
import { AppAuthRepository } from '../contracts/repositories';
import {
  AppAuthService,
  AppLoggingService,
  AppStateService,
} from '../contracts/services';
import { AppUser, AppSignInModel, AppUserWithAvatar } from '../models/domain';
import { getUserAvatarUrl } from './avatar.service';

export class AuthService implements AppAuthService {
  constructor(
    private avatarEndpointUrl: string,
    private authRepo: AppAuthRepository,
    private loggingService: AppLoggingService,
    private stateService: AppStateService
  ) {}

  private setCurrentUser(user: AppUser | undefined) {
    let appUser: AppUserWithAvatar | undefined = undefined;
    if (user) {
      appUser = {
        ...user,
        avatar: getUserAvatarUrl(user.mail, this.avatarEndpointUrl),
      };
    }
    this.stateService.setStateItem('currentUser', appUser);
  }
  public getCurrentUser(): AppUser | undefined {
    return this.stateService.getStateItem('currentUser').value;
  }
  public isLoggedIn(): ComputedRef<boolean> {
    return computed(
      () => !!this.stateService.getStateItem('currentUser').value
    );
  }
  public async signIn(signInModel: AppSignInModel): Promise<AppUser> {
    try {
      const user = await this.authRepo.signIn(signInModel);
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      //this.loggingService.error(error.message);
      return Promise.reject(error);
    }
  }

  public async checkAuth(): Promise<AppUser> {
    try {
      const user = await this.authRepo.checkAuth();
      this.setCurrentUser(user);
      return user;
    } catch (error) {
      //this.loggingService.error(error.message);
      this.setCurrentUser(undefined);
      return Promise.reject(error);
    }
  }
  public async signOut(): Promise<void> {
    try {
      await this.authRepo.signOut();
      this.setCurrentUser(undefined);
    } catch (error) {}
  }
}
