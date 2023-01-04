import cookies from 'browser-cookies';
import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { TooltipProvider } from '@radix-ui/react-tooltip';
// import useMedia, { useIsDark, useIsMobile } from 'logic/useMedia';
// import { useIsDark } from 'landscape-apps/dist/src/logic/useMedia';
import useErrorHandler from 'landscape-apps/dist/src/logic/useErrorHandler';
import { useTheme } from 'landscape-apps/dist/src/state/settings';
import {
  useAirLockErrorCount,
  useErrorCount,
  useLocalState,
  useSubscriptionStatus,
} from 'landscape-apps/dist/src/state/local';
import ErrorAlert from 'landscape-apps/dist/src/components/ErrorAlert';
import DisconnectNotice from 'landscape-apps/dist/src/components/DisconnectNotice';

import replaceFavicon from '../assets/android-chrome-512x512.png';
// import favicon from './apps/trove/src/assets/android-chrome-512x512.png';
import bootstrap from './bootstrap';

const appHead = {
  title: 'Trove',
  icon: replaceFavicon || backupIcon,
};

function authRedirect() {
  document.location = `${document.location.protocol}//${document.location.host}`;
}

function checkIfLoggedIn() {
  const session = cookies.get(`urbauth-~${window.ship}`);

  if (!('ship' in window)) authRedirect();
  if (!session) authRedirect();
}

function handleGridRedirect(navigate) {
  const query = new URLSearchParams(window.location.search);

  if (query.has('grid-note')) {
    navigate(decodeURIComponent(query.get('grid-note')));
  } else if (query.has('grid-link')) {
    navigate(decodeURIComponent(query.get('grid-link')));
  }
}

function LandscapeAppWrapper({ children }) {
  const navigate = useNavigate();
  const handleError = useErrorHandler();
  const location = useLocation();
  // const isMobile = useIsMobile();
  // const isSmall = useMedia('(max-width: 1023px)');
  const subscription = useSubscriptionStatus();
  const errorCount = useErrorCount();
  const airLockErrorCount = useAirLockErrorCount();

  useEffect(() => {
    handleError(() => {
      checkIfLoggedIn();
      handleGridRedirect(navigate);
    })();
  }, [handleError, navigate]);

  useEffect(() => {
    handleError(() => {
      bootstrap();
    })();
  }, [handleError]);

  const state = location.state;

  useEffect(() => {
    if (
      (errorCount > 4 || airLockErrorCount > 1) &&
      subscription === 'connected'
    ) {
      useLocalState.setState({ subscription: 'disconnected' });
    }
  }, [errorCount, subscription, airLockErrorCount]);

  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      state,
      location,
    });
  });

  return (
    <div className="flex h-full w-full flex-col">
      {subscription === 'disconnected' || subscription === 'reconnecting' ? (
        <DisconnectNotice />
      ) : null}
      {childrenWithProps}
      {/* {children} */}
      {/* <TroveRoutes
        state={state}
        location={location}
        isMobile={isMobile}
        isSmall={isSmall}
      /> */}
    </div>
  );
}

export default function AuthRouter({ children }) {
  const basename = '/apps/trove';

  const [userThemeColor, setUserThemeColor] = useState('#ffffff');
  const theme = useTheme();
  // const isDarkMode = useIsDark();

  // useEffect(() => {
  //   if ((isDarkMode && theme === 'auto') || theme === 'dark') {
  //     document.body.classList.add('dark');
  //     useLocalState.setState({ currentTheme: 'dark' });
  //     setUserThemeColor('#000000');
  //   } else {
  //     document.body.classList.remove('dark');
  //     useLocalState.setState({ currentTheme: 'light' });
  //     setUserThemeColor('#ffffff');
  //   }
  // }, [isDarkMode, theme]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorAlert}
      onReset={() => window.location.reload()}
    >
      <HelmetProvider>
        <Router basename={basename}>
          <Helmet>
            <title>{appHead.title}</title>
            <link
              rel="icon"
              href={appHead.icon}
              sizes="any"
              type="image/png"
              // type="image/svg+xml"
            />
            <meta name="theme-color" content={userThemeColor} />
            <link rel="manifest" href="/src/assets/manifest.json" />
          </Helmet>
          <TooltipProvider skipDelayDuration={400}>
            <LandscapeAppWrapper>{children}</LandscapeAppWrapper>
          </TooltipProvider>
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
