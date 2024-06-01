export interface IAPIResponse<T> {
  data: T | null;
  error: null | string;
  message: null | string;
}
