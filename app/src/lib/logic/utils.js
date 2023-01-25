export function createStorageKey(name) {
  const desk = window?.desk?.length ? window.desk : 'trove';
  return `~${window.ship}/${desk}/${name}`;
}
// for purging storage with version updates
export function clearStorageMigration() {
  return {};
}
export const storageVersion = parseInt(import.meta.env.VITE_STORAGE_VERSION, 10);
