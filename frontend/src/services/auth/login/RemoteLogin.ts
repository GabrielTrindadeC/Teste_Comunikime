import { axios } from "../../../api/axios";
import { RemoteLoginParamsType, RemoteLoginType } from "./type";

export async function RemoteLogin(params: RemoteLoginParamsType): Promise<RemoteLoginType> {
  const { data } = await axios.post<RemoteLoginType>('auth/login', params)
  return data;
}