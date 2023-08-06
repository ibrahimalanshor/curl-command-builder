import { createPinia } from 'pinia';
import { usePiniaPersist } from './plugins/persist';

export function setupStore(app) {
  const store = createPinia();

  usePiniaPersist(store);

  app.use(store);
}
