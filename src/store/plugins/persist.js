import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export function usePiniaPersist(store) {
  store.use(piniaPluginPersistedstate);
}
