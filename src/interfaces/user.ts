export interface IUser {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isAdmin?: boolean;
    squadId?: string | null;
  }