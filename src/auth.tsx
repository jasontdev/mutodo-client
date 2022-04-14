import React, { createContext, ReactElement, useContext } from "react";

type AuthProviderProps = {
  children: ReactElement[] | ReactElement;
};

export const auth = {
  accessToken: "",
  setAccessToken: function (accessToken: string) {
    this.accessToken = accessToken;
  },
  getAccessToken: function (): string {
    return this.accessToken;
  },
  loginUri: function (): string {
    let uri = `${import.meta.env.VITE_OAUTH2_ENDPOINT}/login?`;
    uri += `client_id=${import.meta.env.VITE_OAUTH2_CLIENT_ID}`;
    uri += `&response_type=code`;
    uri += `&scope=openid`;
    uri += `&redirect_uri=${import.meta.env.VITE_OAUTH2_REDIRECT_URI}`;

    return uri;
  },
};

const AuthContext = createContext(auth);
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
