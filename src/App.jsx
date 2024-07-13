import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Tools from './pages/Tools.jsx';
import Questionnaire from './pages/Questionnaire.jsx';

const router = createBrowserRouter([
  {
    path: '/questionare',
    element: <Questionnaire />,
  },
]);

function Router() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default Router;
