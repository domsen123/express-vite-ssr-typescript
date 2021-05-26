import { App } from 'vue';
import Locator from '@/globals/dependencies/locator';
import { LocatorKey } from '~/symbols';
import { Request, Response } from 'express';
export default {
  install: ({
    app,
    isClient,
    request,
    response,
  }: {
    app: App;
    isClient: boolean;
    request?: Request;
    response?: Response;
  }) => {
    const locator = new Locator(isClient, request, response);
    app.provide(LocatorKey, locator);
    return locator;
  },
};
