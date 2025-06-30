import { useLocation } from 'react-router-dom';
import { AppHeaderUI } from '../ui';

export const AppHeader = () => {
  const location = useLocation();
  return <AppHeaderUI locationPath={location.pathname} />;
};
