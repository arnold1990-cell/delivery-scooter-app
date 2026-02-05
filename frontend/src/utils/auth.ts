const TOKEN_KEY = 'token';
const ROLES_KEY = 'roles';

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);

const decodeJwtPayload = (token: string) => {
  const payload = token.split('.')[1];
  if (!payload) {
    return null;
  }
  try {
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    const decoded = atob(padded);
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch (error) {
    return null;
  }
};

const normalizeRoles = (roles: unknown): string[] => {
  if (Array.isArray(roles)) {
    return roles.map((role) => String(role)).filter((role) => role.length > 0);
  }
  if (typeof roles === 'string') {
    return roles
      .split(',')
      .map((role) => role.trim())
      .filter(Boolean);
  }
  return [];
};

export const getStoredRoles = (): string[] => {
  const rawRoles = localStorage.getItem(ROLES_KEY);
  if (rawRoles) {
    try {
      const parsed = JSON.parse(rawRoles);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  const token = getStoredToken();
  if (!token) {
    return [];
  }

  const payload = decodeJwtPayload(token);
  const roles = payload ? normalizeRoles(payload.roles) : [];
  if (roles.length > 0) {
    localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
  }
  return roles;
};

export const setAuthStorage = (token: string, roles: string[]) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
};

export const clearAuthStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLES_KEY);
};

export const hasRole = (role: string) => getStoredRoles().includes(role);

export const hasAnyRole = (roles: string[]) => roles.some((role) => getStoredRoles().includes(role));
