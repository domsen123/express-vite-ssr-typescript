import { AppAuthRepository } from '@/core/contracts/repositories';
import { AppSignInModel, AppUser } from '@/core/models/domain';
import { AxiosInstance } from 'axios';

export class AuthRepository implements AppAuthRepository {
  constructor(private axios: AxiosInstance) {}

  private getSignInUrl() {
    return `/signIn`;
  }
  public async signIn(signInModel: AppSignInModel): Promise<AppUser> {
    try {
      const { data } = await this.axios.post<AppUser>(
        this.getSignInUrl(),
        signInModel
      );
      return data;
    } catch (error) {
      return error;
    }
  }
}
