import { createHashRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';

export const router = createHashRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      // legacy paths resolve to the same single-page experience
      { path: 'portfolio', element: <Home /> },
      { path: 'about', element: <Home /> },
      { path: '*', element: <Home /> },
    ],
  },
]);
