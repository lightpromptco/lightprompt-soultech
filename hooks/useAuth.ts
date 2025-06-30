// Simple auth hook for Next.js
export function useAuth() {
  return {
    user: null,
    isAuthenticated: false,
    logout: () => {}
  };
}