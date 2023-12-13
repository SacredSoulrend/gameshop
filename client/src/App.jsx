import "./styles/main.scss";
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import AppRouter from './routers/AppRouter';
import store from './redux/store/store';

const httpLink = createHttpLink({
  uri: '/graphql', // Adjust the URI based on your GraphQL server endpoint
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <AppRouter>
          <Outlet />
        </AppRouter>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
