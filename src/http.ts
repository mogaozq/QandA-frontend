import { ApiBaseUrl } from './AppSettings';

export interface HttpRequest<BodyType> {
  path: string;
  method?: string;
  body?: BodyType;
  accessToken?: string;
}

export interface HttpResponse<BodyType> {
  ok: boolean;
  body?: BodyType;
}

export const http = async <ResponseBodyType, RequestBodyType = undefined>(
  config: HttpRequest<RequestBodyType>,
): Promise<HttpResponse<ResponseBodyType>> => {
  const requestUrl = ApiBaseUrl + config.path;
  const request = new Request(requestUrl, {
    method: config.method || 'GET',
    body: config.body ? JSON.stringify(config.body) : undefined,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (config.accessToken) request.headers.set('Authorization', `bearer ${config.accessToken}`);

  const response = await fetch(request);
  if (response.ok)
    return {
      ok: true,
      body: await response.json(),
    };
  else {
    await logError(request, response);
    return { ok: false };
  }
};

export const logError = async (request: Request, response: Response) => {
  const contentType = response.headers.get('content-type');
  let body: any;
  if (contentType && contentType.indexOf('application/json') !== -1) {
    body = await response.json();
  } else {
    body = await response.text();
  }
  console.error(`Request Error ${request.method} ${request.url}`, body);
};
