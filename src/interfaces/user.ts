export interface IUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  is_admin?: boolean;
  teamId?: string | null;
}
