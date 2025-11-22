const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

function serializeBody(body: BodyInit | null | undefined) {
  if (!body) return undefined;

  if (body instanceof FormData) {
    const serialized: Record<string, unknown> = {};
    body.forEach((value, key) => {
      if (value instanceof File) {
        serialized[key] = {
          fileName: value.name,
          size: value.size,
          type: value.type,
        };
      } else {
        serialized[key] = value;
      }
    });
    return serialized;
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return body;
    }
  }

  return body;
}

async function logResponse(response: Response) {
  try {
    const cloned = response.clone();
    const text = await cloned.text();
    let parsed: unknown = text;
    try {
      parsed = text ? JSON.parse(text) : undefined;
    } catch {
      parsed = text;
    }
    console.log('[API Response]', response.url, response.status, parsed);
  } catch (error) {
    console.log('[API Response]', response.url, response.status, 'Failed to read body', error);
  }
}

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorBody = await response
      .json()
      .catch(() => ({ message: response.statusText }));

    throw new Error(
      errorBody.message || `API Error: ${response.status} ${response.statusText}`,
    );
  }

  if (response.status === 204) {
    return {} as T;
  }

  return (await response.json()) as T;
}

export async function apiRequest<T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> {
  const fullUrl = `${API_BASE_URL}${url}`;
  const mergedOptions: RequestOptions = {
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (options.body instanceof FormData) {
    delete mergedOptions.headers?.['Content-Type'];
  }

  console.log('[API Request]', fullUrl, mergedOptions.method ?? 'GET', serializeBody(mergedOptions.body));
  const response = await fetch(fullUrl, mergedOptions);
  await logResponse(response);
  return handleResponse<T>(response);
}
