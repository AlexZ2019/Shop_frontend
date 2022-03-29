export const storeData = (key: string, value: string) => {
  window.localStorage.setItem(key, value)
}

export const getStoreData = (key: string) => {
  return window.localStorage.getItem(key)
}

