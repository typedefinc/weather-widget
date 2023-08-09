import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ErrorResponse {
  message: string,
  details: object,
}

export interface AxiosCallResponse<T> {
  data?: T,
  error?: AxiosError<ErrorResponse | null>,
}

export class BaseService {
  protected axiosInstance: AxiosInstance | undefined;

  constructor(resource: string) {
    this.axiosInstance = axios.create({
      baseURL: `${import.meta.env.VITE_APP_WEATHER_API}/${resource}`,
      params: {
        appid: import.meta.env.VITE_APP_WEATHER_API_KEY,
        units: 'metric',
      }
    });
  }

  protected async axiosCall<T>(
    config: AxiosRequestConfig,
  ): Promise<AxiosCallResponse<T>> {
    if (!this.axiosInstance) {
      throw new Error('axiosInstance not set');
    }

    try {
      const { data } = await this.axiosInstance.request(config);

      return { data };
    } catch (err: unknown) {
      const error = err as AxiosError<ErrorResponse | null>;

      return { error };
    }
  }
}
