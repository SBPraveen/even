import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@emotion/react';
import {theme} from './theme'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateWebsocketServer from './pages/CreateWebsocketServer'
import WebsocketTestEngine from './pages/WebsocketTestEngine'
import KafkaServer from './pages/KafkaServer'
import SchemaRegistry from './pages/SchemaRegistry'
import Error from './pages/Error'
import Layout from './pages/layout';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Layout><Error/></Layout>,
    children: [
      {
        path: "/webSocketServer",
        element: <CreateWebsocketServer/>,
      },
      {
        path: "/webSocketTestEngine",
        element: <WebsocketTestEngine/>,
      },
      {
        path: "/kafkaServer",
        element: <KafkaServer/>,
      },
      {
        path: "/schemaRegistry",
        element: <SchemaRegistry/>,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
