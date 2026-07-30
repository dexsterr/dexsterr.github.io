import { createHashRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Index from './pages/Index';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import NotFound from './pages/NotFound';

export const router = createHashRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Index /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
