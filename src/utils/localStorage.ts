/**
 * 设置本地存储
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setStroage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获得本地存储
 */
export const getStroage = (key: string) => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : null;
};

/**
 * 设置会话存储
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setSessionStroage = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获得会话存储
 */
export const getSessionStroage = (key: string) => {
  const data = sessionStorage.getItem(key);

  return data ? JSON.parse(data) : null;
};
