export const setLocalStorageValue = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

export const getLocalStorageValue = (key: string) => {
  return window.localStorage.getItem(key);
};

export const removeLocalStorageValue = (key: string) => {
  return window.localStorage.removeItem(key);
};

export const setTokensToLocalStorage = (tokens: { accessToken: string; refreshToken: string }) => {
  setLocalStorageValue('accessToken', tokens.accessToken);
  setLocalStorageValue('refreshToken', tokens.refreshToken);
};
