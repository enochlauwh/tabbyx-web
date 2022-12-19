import { RouteObject, useRoutes } from 'react-router-dom';

import Sidebar from '@components/Sidebar';
import { Flex } from '@chakra-ui/react';
import CompletedPage from '@pages/CompletedPage';
import LandingPage from '@pages/LandingPage';
import CheckPage from '@pages/CheckPage.tsx';
import BookingPage from '@pages/BookingPage.tsx';

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
      {
        path: 'complete',
        element: <CompletedPage />,
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
