import axios, { AxiosInstance } from 'axios';
import { API_HEADERS, API_TIMEOUT, API_URL } from './consts';

class ApiClient {
  private static instance: ApiClient;

  private axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: API_HEADERS,
    timeout: API_TIMEOUT, // 10 seconds
  });

  
  private constructor() {
    // Private constructor to prevent instantiation
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
        // Handle error
        console.error(error);
        throw error;
    }
}

public async post(url: string, data?: any, config?: any) {
    try 
    {
        return await this.axiosInstance.post(url, data, config);
    }
    catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
}

public async put(url: string, data?: any, config?: any) {
    try 
    {
        return await this.axiosInstance.put(url, data, config);
    }
    catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
}

public async delete(url: string, config?: any) {
    try 
    {
        return await this.axiosInstance.delete(url, config);
    }
    catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
}

public async patch(url: string, data?: any, config?: any) {
    try 
    {
        return await this.axiosInstance.patch(url, data, config);
    }
    catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
}

public async options(url: string, config?: any) {
    return this.axiosInstance.options(url, config);
}

}

export default ApiClient;