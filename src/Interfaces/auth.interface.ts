import { IProfile } from "./user.interface";

export interface LoginResponse {
  access_token: string;
}

export enum UserStorageKeys {
  UserData = "UserData",
}

export interface UserPersistent {
  jwt: string | null;
}

export interface IUserState extends UserPersistent {
  loginErrorMessage?: string;
  registerErrorMessage?: string;
  userProfile: IProfile | null;
}
