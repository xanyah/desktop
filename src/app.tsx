import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import "./i18n";

import { queryClient, routes } from "./constants";

import "./app.scss";
import { QueryClientProvider } from "@tanstack/react-query";
import { filter, map } from "lodash";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            {map(
              filter(routes, (route) => route.inRouter), 
              (route) => (
                <Route
                  element={route.element}
                  key={route.path}
                  path={route.path}
                />
              )
            )}
          </Routes>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
