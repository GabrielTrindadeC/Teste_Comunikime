import { RemoteLoginParamsType } from "../../services/auth/login/type";
import { RemoteLoginType } from "../../services/auth/login/type";
import { RemoteRegisterParamTypes } from "../../services/auth/register/type";

export type AuthStoreType = {
  isLogged: boolean
  userData: RemoteLoginType | null,
  authToken: string | null;
  Login: (params: RemoteLoginParamsType) => Promise<void | RemoteLoginType>
  Register: (params: RemoteRegisterParamTypes) => Promise<boolean>
  Logout: () => void;
}
