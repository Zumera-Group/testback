import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const TOKEN = process.env.NEXT_PUBLIC_SALESFORCE_API_BEARER_TOKEN;

export class AxiosService {
  protected readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({});
    this.instance.interceptors.request.use(
      function (config) {
        return {
          ...config,
          data: {
            ...config.data,
          },
          headers: {
            ...DEFAULT_HEADERS,
            Authorization: `Bearer ${TOKEN}`,
          },
        };
      },
      function (error) {
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      function (response) {
        return {
          ...response,
        };
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  }

  async get(path: string, config?: AxiosRequestConfig) {
    try {
      return await this.instance.get(path, config);
    } catch (error) {
      this.manageErrors(error);
    }
  }

  async post<T>(path: string, payload: T, config: AxiosRequestConfig) {
    try {
      return await this.instance.post(path, payload, config);
    } catch (error) {
      this.manageErrors(error);
    }
  }

  async put<T>(path: string, payload: T, config: AxiosRequestConfig) {
    try {
      return await this.instance.put(path, payload, config);
    } catch (error) {
      this.manageErrors(error);
    }
  }

  manageErrors(e: any & Error) {
    throw new Error(e);
  }
}
