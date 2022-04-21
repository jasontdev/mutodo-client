import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "@fontsource/open-sans";
import { Layout } from "./layout";
import { GlobalStyle } from "./GlobalStyle";
import App from "./App";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import { AuthProvider } from "./auth";

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
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
