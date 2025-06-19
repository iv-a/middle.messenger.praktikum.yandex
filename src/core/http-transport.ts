import { HTTPError } from './errors';

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export type HTTPMethodName = (typeof METHODS)[keyof typeof METHODS];

export interface RequestOptions<H = Record<string, unknown> | FormData> {
  headers?: Record<string, string>;
  data?: H;
  timeout?: number;
}

function queryStringify(params: Record<string, unknown>): string {
  if (typeof params !== 'object' || params === null) {
    throw new Error('Data for queryStringify must be a non-null object');
  }

  const parts = Object.entries(params)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    );

  return parts.length > 0 ? `?${parts.join('&')}` : '';
}

type HTTPMethod = <T = unknown, H = Record<string, unknown> | FormData>(
  url: string,
  options?: RequestOptions<H>,
) => Promise<T>;

export class HTTPTransport {
  private defaultTimeout = 5000;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  public get: HTTPMethod = (endpoint, options) =>
    this.request(this.baseUrl + endpoint, { ...options, method: METHODS.GET });

  public post: HTTPMethod = (endpoint, options) =>
    this.request(this.baseUrl + endpoint, { ...options, method: METHODS.POST });

  public put: HTTPMethod = (endpoint, options) =>
    this.request(this.baseUrl + endpoint, { ...options, method: METHODS.PUT });

  public delete: HTTPMethod = (endpoint, options) =>
    this.request(this.baseUrl + endpoint, {
      ...options,
      method: METHODS.DELETE,
    });

  private request<T = unknown, H = Record<string, unknown>>(
    url: string,
    options: RequestOptions<H> & { method: HTTPMethodName },
  ): Promise<T> {
    const { method, headers = {}, data, timeout } = options;
    const effectiveTimeout =
      typeof timeout === 'number' ? timeout : this.defaultTimeout;

    return new Promise<T>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      let requestUrl = url;
      if (isGet && data && !(data instanceof FormData)) {
        requestUrl += queryStringify(data as Record<string, unknown>);
      }

      xhr.open(method, requestUrl);
      xhr.withCredentials = true;

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.timeout = effectiveTimeout;

      xhr.onload = () => {
        const contentType = xhr.getResponseHeader('Content-Type') || '';
        let parsed: unknown = xhr.responseText;

        try {
          if (contentType.includes('application/json')) {
            parsed = xhr.responseText ? JSON.parse(xhr.responseText) : {};
          }
        } catch (e) {
          console.warn('Invalid JSON received:', xhr.responseText);
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(parsed as T);
        } else {
          reject(new HTTPError(xhr.status, parsed));
        }
      };

      xhr.onerror = () => reject(new Error('Network error'));
      xhr.ontimeout = () =>
        reject(new Error(`Request timed out after ${effectiveTimeout} ms`));
      xhr.onabort = () => reject(new Error('Request aborted'));

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        if (
          !Object.keys(headers).some((h) => h.toLowerCase() === 'content-type')
        ) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
