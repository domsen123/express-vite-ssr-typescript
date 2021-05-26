import { AppLocator } from '@/globals/dependencies/locator';
import { InjectionKey } from 'vue';

export const LocatorKey: InjectionKey<AppLocator> = Symbol('Locator');
