import { Ref } from 'vue';

export interface AppStorageRepository {
  setItem<T>(key: string, value: T): void;
  getItem<T>(key: string): Ref<T> | undefined;
  removeItem(key: string): void;
  clearAll(): void;
}
