// 현재 로그인 중인 계정 판별 위한 JWT 토큰 decode
export function decodeJwt<T = any>(token?: string | null): T | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padding = (4 - (base64.length % 4)) % 4;
    const padded = base64 + '='.repeat(padding);
    const json = atob(padded);
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}
