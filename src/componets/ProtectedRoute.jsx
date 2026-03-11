import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';

/**
 * Wrap any route with <ProtectedRoute> to require login.
 *
 * - Direct URL access (fresh page load / typed URL):
 *     → Redirects to /login page.
 * - In-app navigation (clicked a link inside the app):
 *     → Keeps the user on the current page and opens the login modal.
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const openLoginModal  = useUiStore((s) => s.openLoginModal);
  const navigate        = useNavigate();

  useEffect(() => {
    if (isAuthenticated) return;

    // window.history.state.idx === 0 means there's no in-app history —
    // the user landed here via a direct URL or hard refresh.
    const isDirectAccess = !window.history.state?.idx;

    if (isDirectAccess) {
      navigate('/login', { replace: true });
    } else {
      openLoginModal();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return children;
};

export default ProtectedRoute;
