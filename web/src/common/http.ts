export const get = async <T>(info: RequestInfo): Promise<T> => {
  const response = await fetch(info);

  const isError = response.status >= 300;
  if (isError) {
    console.error(response);
    throw response;
  }

  return response.json() as unknown as T;
};

const http = { get };
export default http;
