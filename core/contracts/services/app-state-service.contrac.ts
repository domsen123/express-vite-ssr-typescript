import { ComputedRef } from 'vue';
import { AppUserWithAvatar } from '@/core/models/domain';

export const APP_STATE_KEY = 'APP_STATE_KEY';

export interface AppState {
  currentUser: AppUserWithAvatar | undefined;
}

export interface AppStateService {
  getStateItem<K extends keyof AppState>(name: K): ComputedRef<AppState[K]>;
  setStateItem<K extends keyof AppState>(name: K, state: AppState[K]): void;
}
