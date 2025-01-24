/// <reference types="vite/client" />

declare interface ImportMeta {
  readonly env: CustomImportMetaEnv;
}

declare interface CustomImportMetaEnv extends ImportMetaEnv {
  readonly VITE_AUTH_STORAGE_KEY?: string;
}
