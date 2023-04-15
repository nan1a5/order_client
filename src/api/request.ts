import axios, { AxiosRequestConfig } from "axios";

const baseURL = "http://localhost:3039/api";

const timeout = 30000;

const _request = axios.create({
    baseURL,
    timeout,
    withCredentials: false
});

// 请求拦截器
_request.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        console.log('====================================');
        console.log('request_error', error);
        console.log('====================================');
        return Promise.reject(error);
    }
);

// 响应拦截器
_request.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log('====================================');
        console.log('response_error', error);
        console.log('====================================');
        return Promise.reject(error);
    }
);

interface Iaxios<T> {
    data: T;
    status: number;
    statusText: string;
}

interface IResponse<T> {
    code: number;
    msg: string;
    data: T
}

const requestHandler = <T>(method: 'get'|'post'|'put'|'delete', url: string, params: object={}, config: AxiosRequestConfig={}): Promise<T> => {
    let response: Promise<Iaxios<IResponse<T>>>

    switch (method) {
        case 'get':
            response = _request.get(url, { params: {...params}, ...config });
            break;
        case 'post':
            response = _request.post(url, {...params}, {...config});
            break;
        case 'put':
            response = _request.put(url, {...params}, {...config});
            break;
        case 'delete':
            response = _request.delete(url, { params, ...config });
            break;
    }

    return new Promise((resolve, reject) => {
        response.then((res) => {
            const { data } = res;
            if (data.code === 200) {
                resolve(data.data);
            } else {
                reject(data);
            }
        }
        ).catch((err) => {
            reject(err);
        });
    });


    
};

const request = {
    get: <T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> => requestHandler<T>('get', url, params, config),
    post: <T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> => requestHandler<T>('post', url, params, config),
    put: <T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> => requestHandler<T>('put', url, params, config),
    delete: <T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> => requestHandler<T>('delete', url, params, config),
}

export default request;