const STORAGE_KEY = 'x-client-id';

export const getClientId = (): string => {
  let clientId = localStorage.getItem(STORAGE_KEY);

  if (!clientId) {
    clientId = window.crypto?.randomUUID?.() || self.crypto?.randomUUID?.() || fallbackUUID();
    localStorage.setItem(STORAGE_KEY, clientId);
  }

  return clientId;
};

function fallbackUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
