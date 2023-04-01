import axios, { AxiosResponse } from 'axios';

export interface HttpResponse {
    data: any
};

/**
 * A simple client for making HTTP calls to external services.
 * Uses the Axios library internally.
 */
class HttpClient {
    static async get(url: string): Promise<HttpResponse> {
        const response: AxiosResponse = await axios.get(url);

        return {
            data: response.data
        };
    }

    static async post(url: string, payload?: any): Promise<HttpResponse> {
        const response: AxiosResponse = await axios.post(url, payload);

        return {
            data: response.data
        };
    }

    static async delete(url: string, payload?: any): Promise<HttpResponse> {
        const response: AxiosResponse = await axios.delete(url, payload);

        return {
            data: response.data
        };
    }
}

export default HttpClient;