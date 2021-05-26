import { AppUserWithAvatar } from '@/core/models/domain';
import { Ref, ComputedRef } from 'vue';

export const APP_STATE_KEY = 'APP_STATE_KEY';

export interface AppState {
  currentUser: AppUserWithAvatar;
}

export interface AppStateService {
  getStateItem<K extends keyof AppState>(name: K): ComputedRef<AppState[K]>;
  setStateItem<K extends keyof AppState>(name: K, state: AppState[K]): void;
}
