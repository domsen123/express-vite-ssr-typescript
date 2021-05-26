import { Ref } from 'vue';
import { AppStorageRepository } from '../contracts/repositories';
import { AppStorageService } from '../contracts/services';

export class StorageService implements AppStorageService {
  constructor(private storageRepo: AppStorageRepository) {}

  public setItem<T>(key: string, value: T): void {
    this.storageRepo.setItem(key, value);
  }
  public getItem<T>(key: string): Ref<T> | undefined {
    return this.storageRepo.getItem(key);
  }
  public removeItem(key: string): void {
    this.storageRepo.removeItem(key);
  }
  public clearAll(): void {
    this.storageRepo.clearAll();
  }
}
