import { axios } from "../../../api/axios";
import { RemoteRegisterParamTypes, RemoteRegisterType } from "./type";

export async function RemoteRegister(params: RemoteRegisterParamTypes) {
  const { data } = await axios.post<RemoteRegisterType>('auth/register', params)
  return data;
}