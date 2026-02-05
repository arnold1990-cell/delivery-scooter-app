export const getStoredToken = () => localStorage.getItem('token');

export const getStoredRoles = (): string[] => {
  const rawRoles = localStorage.getItem('roles');
  if (!rawRoles) {
    return [];
  }
  try {
    const parsed = JSON.parse(rawRoles);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

export const hasRole = (role: string) => getStoredRoles().includes(role);

export const hasAnyRole = (roles: string[]) => roles.some((role) => getStoredRoles().includes(role));
