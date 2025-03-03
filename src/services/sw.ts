/* eslint-disable @typescript-eslint/no-unused-vars */
import { ServiceWorkerMLCEngineHandler } from '@mlc-ai/web-llm';

let handler: ServiceWorkerMLCEngineHandler;

self.addEventListener('activate', function (event) {
  handler = new ServiceWorkerMLCEngineHandler();
  console.log('Service Worker is ready');
});
