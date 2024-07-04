// utils/parseUserData.js
export function parseUserData(headers: any) {
  const userData = headers.get("X-User-Data");
  return userData ? JSON.parse(userData) : null;
}
