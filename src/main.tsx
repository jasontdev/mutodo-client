import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "@fontsource/open-sans";
import { GlobalStyle } from "./GlobalStyle";
import App from "./App";
import Login from "./Login";
import { AuthProvider } from "./auth";
import Tasklist from "./Tasklist";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <div>
                  <GlobalStyle />
                  <Outlet />
                </div>
              }
            >
              <Route path="/" element={<App />} />
              <Route path="/login" element={<Login />} />
              <Route path="/tasklist/:tasklist_id" element={<Tasklist />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
