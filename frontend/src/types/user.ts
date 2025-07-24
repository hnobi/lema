export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

export interface IUserResponse {
  users: IUser[];
  limit: number;
  page: number;
totalPages: number;
}

