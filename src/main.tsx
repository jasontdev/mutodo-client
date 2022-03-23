import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import Login from "./Login";
import Tasks from "./tasks";
import Navbar from "./Navbar";
import { Layout } from "./layout";
import { GlobalStyle } from "./GlobalStyle";
import Register from "./Register";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Layout>
                <GlobalStyle />
                <Outlet />
              </Layout>
            }
          >
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
