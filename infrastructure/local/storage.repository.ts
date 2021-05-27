import { Ref } from 'vue';
import { useSessionStorage, useStorage } from '@vueuse/core';
import { AppStorageRepository } from '@/core/contracts/repositories';

export class StorageRepository implements AppStorageRepository {
  private storage: Record<string, Ref<any>> = {};
  setItem<T>(key: string, value: T): void {
    if (this.storage[key]) {
      this.storage[key].value = value;
    } else {
      this.storage[key] = useSessionStorage(key, value);
    }
  }
  getItem<T>(key: string): Ref<T> | undefined {
    if (this.storage[key]) {
      return this.storage[key];
    }
    return undefined;
  }
  removeItem(key: string): void {
    if (this.storage[key]) {
      delete this.storage[key];
    }
  }
  clearAll(): void {
    this.storage = {};
  }
}
