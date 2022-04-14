interface ImportMetaEnv {
  readonly VITE_OAUTH2_ENDPOINT: string;
  readonly VITE_OAUTH2_CLIENT_ID: string;
  readonly VITE_OAUTH2_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
