export interface UserType {
  id: string | number;
  name: string;
  surname: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface FormData {
  name: string;
  surname: string;
}