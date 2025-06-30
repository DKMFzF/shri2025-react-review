import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from './App-Layout';
import {
  AnalystPage,
  GeneratorPage,
  HistoryPage,
  NotFoundPage,
} from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <AnalystPage /> },
      { path: 'generator', element: <GeneratorPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
