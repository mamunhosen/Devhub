const baseURL = import.meta.env.VITE_API_BASE_URL;

interface BaseConfig {
  baseURL: string;
  headers: {
    "Content-Type": string;
  };
  timeout: number;
}

const baseConfig: BaseConfig = {
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
};

export { baseConfig as default, baseURL };
