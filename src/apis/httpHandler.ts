import axios, { AxiosRequestConfig } from "axios";
//class to handle all apis calls
//in our case we are handling only one
class HttpHandler {
  static baseUrl = "https://api.zues.ae/api/";

  static makeRequest(
    endpoint: string,
    method: string,
    data?: any
  ): Promise<any> {
    const config: AxiosRequestConfig = {
      url: `${this.baseUrl}${endpoint}`,
      method,
      data,

    };
    return axios(config);
  }
}

export default HttpHandler;