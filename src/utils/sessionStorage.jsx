export function saveSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSessionStorage(key) {
  const getResult = sessionStorage.getItem(key);
  return JSON.parse(getResult);
}
