export function createStorageKey(name) {
  return `~${window.ship}/${window.desk || 'trove'}/${name}`;
}
// for purging storage with version updates
export function clearStorageMigration() {
  return {};
}
export const storageVersion = parseInt(import.meta.env.VITE_STORAGE_VERSION, 10);
