export const useIsTauri = () => {
  return '__TAURI_INTERNALS__' in window
}
