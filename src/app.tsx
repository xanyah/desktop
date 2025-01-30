import { Provider } from 'react-redux'
import './index.css'

import store from "./store";

import "./i18n";

import { queryClient } from "./constants";

import { QueryClientProvider } from "@tanstack/react-query";
import Router from './routes';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
