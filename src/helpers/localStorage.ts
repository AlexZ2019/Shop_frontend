export const setLocalStorageValue = (key: string, value: string) => {
  window.localStorage.setItem(key, value)
}

export const getStoreData = (key: string) => {
  return window.localStorage.getItem(key)
}

export const removeLocalStorageValue = (key: string) => {
  return window.localStorage.removeItem(key)
}
