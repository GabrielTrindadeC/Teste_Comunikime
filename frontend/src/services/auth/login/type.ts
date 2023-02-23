
export type RemoteLoginParamsType = {
  email: string;
  password: string;
}
export interface User {
  id: number;
  email: string;
  role: number;
  password: string;
  name: string;
  address: string;
  phone: string;
}

export interface RemoteLoginType {
  user: User;
  jwtToken: string;
}