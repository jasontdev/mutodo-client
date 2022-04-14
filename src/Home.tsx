import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { CenteredContent } from "./layout";
import { useAuth } from "./auth";

export default function Home() {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.getAccessToken()) {
      window.location.replace(auth.loginUri());
    }
  });

  return (
    <CenteredContent>
      <Navbar />
      <h1>Tasklists</h1>
      <h3>Hello. Welcome to Mutodo.</h3>
    </CenteredContent>
  );
}
