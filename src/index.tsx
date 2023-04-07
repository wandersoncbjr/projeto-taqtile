import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/login';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Logado from './components/home';
import Cadastro from './components/cadastro';

const client = new ApolloClient({
  uri: 'https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/home', element: <Logado /> },
  { path: '/cadastro', element: <Cadastro /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);
