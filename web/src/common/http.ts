const parseResponse = <T>(response: Response) => {
  const isError = response.status >= 300;
  if (isError) {
    console.error(response);
    throw response;
  }

  return response.json() as unknown as T;
};

const get = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return parseResponse<T>(response);
};

type JsonBody = number | boolean | string | null | JsonBody[] | { [key: string]: JsonBody };

const put = async <T>(url: string, body?: JsonBody): Promise<T> => {
  const requestData = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  const response = await fetch(url, requestData);
  return parseResponse<T>(response);
};

const http = { get, put };
export default http;
