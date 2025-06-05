export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export type HTTPMethod = (typeof METHODS)[keyof typeof METHODS];

export class HTTPError extends Error {
  public status: number;
  public data: unknown;

  constructor(status: number, data: unknown) {
    super(`HTTP Error: ${status}`);
    this.name = 'HTTPError';
    this.status = status;
    this.data = data;
  }
}

export interface RequestOptions<
  H extends Record<string, unknown> | FormData =
    | Record<string, unknown>
    | FormData,
> {
  headers?: Record<string, string>;
  data?: H;
  timeout?: number;
}

function queryStringify(params: Record<string, unknown>): string {
  if (typeof params !== 'object' || params === null) {
    throw new Error('Data for queryStringify must be a non-null object');
  }

  const parts: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) continue;
    const encodedKey = encodeURIComponent(key);
    const encodedValue = encodeURIComponent(String(value));
    parts.push(`${encodedKey}=${encodedValue}`);
  }

  return parts.length > 0 ? `?${parts.join('&')}` : '';
}

export class HTTPTransport {
  private defaultTimeout = 5000;

  public get<TResponse>(
    url: string,
    options: RequestOptions<Record<string, unknown>> = {},
  ): Promise<TResponse> {
    return this._request<TResponse, Record<string, unknown>>(
      METHODS.GET,
      url,
      options,
    );
  }

  public post<TResponse>(
    url: string,
    options: RequestOptions<Record<string, unknown> | FormData> = {},
  ): Promise<TResponse> {
    return this._request<TResponse, Record<string, unknown> | FormData>(
      METHODS.POST,
      url,
      options,
    );
  }

  public put<TResponse>(
    url: string,
    options: RequestOptions<Record<string, unknown> | FormData> = {},
  ): Promise<TResponse> {
    return this._request<TResponse, Record<string, unknown> | FormData>(
      METHODS.PUT,
      url,
      options,
    );
  }

  public delete<TResponse>(
    url: string,
    options: RequestOptions<Record<string, unknown>> = {},
  ): Promise<TResponse> {
    return this._request<TResponse, Record<string, unknown>>(
      METHODS.DELETE,
      url,
      options,
    );
  }

  private _request<TResponse, H extends Record<string, unknown> | FormData>(
    method: HTTPMethod,
    url: string,
    options: RequestOptions<H>,
  ): Promise<TResponse> {
    const { headers = {}, data, timeout } = options;
    const effectiveTimeout =
      typeof timeout === 'number' ? timeout : this.defaultTimeout;

    return new Promise<TResponse>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      let requestUrl = url;
      if (isGet && data && !(data instanceof FormData)) {
        const params = data as Record<string, unknown>;
        const qs = queryStringify(params);
        requestUrl = url + qs;
      }

      xhr.open(method, requestUrl);

      for (const key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          xhr.setRequestHeader(key, headers[key]);
        }
      }

      xhr.timeout = effectiveTimeout;

      xhr.onload = () => {
        const status = xhr.status;
        const raw = xhr.responseText;
        const contentType = xhr.getResponseHeader('Content-Type') || '';
        let parsedBody: unknown;

        try {
          if (contentType.includes('application/json')) {
            parsedBody = raw ? JSON.parse(raw) : {};
          } else {
            parsedBody = raw;
          }
        } catch {
          parsedBody = raw;
        }

        if (status >= 200 && status < 300) {
          resolve(parsedBody as TResponse);
        } else {
          reject(new HTTPError(status, parsedBody));
        }
      };

      xhr.onerror = () => {
        reject(new Error('Network error'));
      };

      xhr.ontimeout = () => {
        reject(new Error(`Request timed out after ${effectiveTimeout} ms`));
      };

      xhr.onabort = () => {
        reject(new Error('Request aborted'));
      };

      if (isGet || data === undefined || data === null) {
        xhr.send();
      } else {
        if (data instanceof FormData) {
          xhr.send(data);
        } else {
          const hasContentType = Object.keys(headers)
            .map((h) => h.toLowerCase())
            .includes('content-type');
          if (!hasContentType) {
            xhr.setRequestHeader('Content-Type', 'application/json');
          }
          xhr.send(JSON.stringify(data as Record<string, unknown>));
        }
      }
    });
  }
}
