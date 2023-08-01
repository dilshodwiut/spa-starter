const settings = {
  baseURL: import.meta.env.VITE_BASE_URL,
  staleTime: 120000, // 2 mins,
  requestTimeout: 15000,
  idleTimeout: 3000, // 3 sec
  rowsPerPage: 10,
  messageDuration: 3,
  defaultLanguage: "ru",
  project: {},
} as const;

export default settings;
