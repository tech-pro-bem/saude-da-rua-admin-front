export function saveLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  const getResult = localStorage.getItem(key);
  return JSON.parse(getResult);
}
