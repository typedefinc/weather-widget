import { AxiosCallResponse, BaseService } from '@/api/base.ts';

export interface WeatherObjectType {
  id: number,
  main: string,
  description: string,
  icon: string,
}

export interface WindObjectType {
  deg: number,
  speed: number,
}

export interface WeatherResponseType {
  id: string,
  name: string,
  main: {
    temp: number,
    feels_like: number,
    humidity: number,
    pressure: number,
  },
  visibility: number,
  weather: WeatherObjectType[],
  wind: WindObjectType,
}

export default class WeatherService extends BaseService {
  constructor() {
    super('weather');
  }

  async getWeatherByCoord(lat: number, lon: number): Promise<WeatherResponseType | null> {
    const response: AxiosCallResponse<WeatherResponseType> = await this.axiosCall({
      params: {
        lat,
        lon,
      }
    });

    return response.data ?? null;
  }

  async getWeatherByPlaceName(query: string): Promise<WeatherResponseType | null> {
    const response: AxiosCallResponse<WeatherResponseType> = await this.axiosCall({
      params: {
        q: query
      }
    });

    return response.data ?? null;
  }


  async getWeatherById(id: number): Promise<WeatherResponseType | null> {
    const response: AxiosCallResponse<WeatherResponseType> = await this.axiosCall({
      params: {
        id,
      }
    });

    return response.data ?? null;
  }
}
