import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Browser routers don't reset scroll position on navigation by default. */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
