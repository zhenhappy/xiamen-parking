/// <reference types="vite/client" />
/// <reference types="unplugin-vue-macros/macros-global" />

interface Cookie {
  domain: null | string;
  expires: number;
  name: string;
  path: string;
  sameSite: string;
  secure: boolean;
  value: string;
}

interface CookieStore {
  get: (string: string | {
    name: string;
    url?: string;
  }) => Promise<Cookie>;
  getAll: () => Promise<Cookie[]>;
  delete: (string: string | {
    name: string;
    url?: string;
    path?: string;
  }) => void;
}

interface Window {
  cookieStore: CookieStore;
  serviceWorker: ServiceWorkerRegistration;
}
