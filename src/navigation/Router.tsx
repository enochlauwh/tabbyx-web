import loadable, { LoadableComponent } from '@loadable/component';
import NProgress from 'nprogress';
import { lazy, ReactNode, Suspense, useEffect } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import Sidebar from '@components/Sidebar';
import LandingPage from '@pages/LandingPage';
import { Flex } from '@chakra-ui/react';
import BookingPage from '@pages/BookingPage.tsx';
import CheckPage from '@pages/CheckPage.tsx';

const LazyLoadNProgress = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return <></>;
};

const lazyRoute = (
  WrappedComponent: React.LazyExoticComponent<() => JSX.Element>,
): ReactNode => {
  return (
    <Suspense fallback={<LazyLoadNProgress />}>
      <WrappedComponent />
    </Suspense>
  );
};

const routes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: '*',
        element: <LandingPage />,
      },
      {
        path: 'booking',
        element: <BookingPage />,
      },
      {
        path: 'check',
        element: <CheckPage />,
      },
    ],
  },
];

const Router = () => {
  const element = useRoutes(routes);

  return (
    <div className="App">
      <Sidebar>
        <Flex flexDirection={'column'}>{element}</Flex>
      </Sidebar>
    </div>
  );
};

export default Router;
