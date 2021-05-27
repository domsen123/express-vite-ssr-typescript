import { computed, ComputedRef } from 'vue';
import {
  AppState,
  AppStateService,
  AppStorageService,
  APP_STATE_KEY,
} from '../contracts/services';

export const INITIAL_STATE: AppState = {
  currentUser: undefined,
};

export class StateService implements AppStateService {
  constructor(private storageService: AppStorageService) {
    const appState = this.storageService.getItem<AppState>(APP_STATE_KEY);
    if (!appState) {
      storageService.setItem<AppState>(APP_STATE_KEY, INITIAL_STATE);
    }
  }
  setStateItem<K extends keyof AppState>(name: K, state: AppState[K]): void {
    const currentStorage = this.storageService.getItem<AppState>(APP_STATE_KEY);
    if (currentStorage && currentStorage.value) {
      this.storageService.setItem(APP_STATE_KEY, {
        ...currentStorage.value,
        [name]: state,
      });
    } else {
      this.storageService.setItem(APP_STATE_KEY, {
        [name]: state,
      });
    }
  }

  getStateItem<K extends keyof AppState>(name: K): ComputedRef<AppState[K]> {
    const appState = this.storageService.getItem<AppState>(APP_STATE_KEY);
    return computed(() => {
      return appState && appState.value[name]
        ? appState.value[name]
        : INITIAL_STATE[name];
    });
  }
}
