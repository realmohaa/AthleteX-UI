import axios, { AxiosInstance } from 'axios';
import { API_HEADERS, API_TIMEOUT, API_URL } from './consts';
import { logger } from "react-native-logs";
import { retrieve, store } from './token_storage';
class ApiClient {
  private static instance: ApiClient;
  private log = logger.createLogger();

  private axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: API_HEADERS,
    timeout: API_TIMEOUT,
  });
  private constructor() {
    // Private constructor to prevent instantiation

    this.axiosInstance.interceptors.response.use(
        (response) => {
          // Do something with the response data
          return response;
        },
        async (error) => {
          // Check if it's a 401 error
          if (error.response.status === 401) {
            // Refresh the token
            const refreshToken = await retrieve("refreshToken");
            const refreshResponse = await this.axiosInstance.post('/api/v1/auth/refresh', { refreshToken });
      
            if (refreshResponse.status === 200) {
              // Store the new tokens
              await store("accessToken", refreshResponse.data.data.tokens.accessToken);
              await store("refreshToken", refreshResponse.data.data.tokens.refreshToken);
      
              // Update the Authorization header
              error.config.headers['Authorization'] = `Bearer ${refreshResponse.data.data.tokens.accessToken}`;
      
              // Retry the original request
              return this.axiosInstance(error.config);
            }
          }
      
          return Promise.reject(error);
        }
      );
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

public async get(url: string, config?: any) {
    try 
    {
        return await this.axiosInstance.get(url, config);
    }
    catch (error) {
        throw this.log.error(error);
    }
}

public async post(url: string, data?: any, config?: any) {
    try 
    {
        return await this.axiosInstance.post(url, data, config);
    }
    catch (error) {
        throw this.log.error(error);
    }
}

public async put(url: string, data?: any, config?: any) {
    try 
    {
        return await this.axiosInstance.put(url, data, config);
    }
    catch (error) {
        throw this.log.error(error);
    }
}

public async delete(url: string, config?: any) {
    try 
    {
        return await this.axiosInstance.delete(url, config);
    }
    catch (error) {
        throw this.log.error(error);
    }
}

public async patch(url: string, data?: any, config?: any) {
    try 
    {
        return await this.axiosInstance.patch(url, data, config);
    }
    catch (error) {
        throw this.log.error(error);
    }
}

public async options(url: string, config?: any) {
    return this.axiosInstance.options(url, config);
}


}

export default ApiClient;