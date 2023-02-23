
import { persist } from 'zustand/middleware'
import { AuthStoreType } from './types'
import { create } from 'zustand'
import { RemoteLogin } from '../../services/auth/login/RemoteLogin'
import { RemoteRegister } from '../../services/auth/register/RemoteRegister'
export const useAuthStore = create(persist<AuthStoreType>((set) => ({
  isLogged: false,
  userData: null,
  authToken: null,
  async Login(params) {
    try {
      const data = await RemoteLogin(params)
      set({ authToken: data.jwtToken, isLogged: true, userData: data })
      return data
    } catch (error) {
      console.log(error)
    }

  },
  async Register(params) {
    try {
      await RemoteRegister(params)
      console.log('criado')
      return true
    } catch (error) {
      console.log('não criado')

      return false
    }
  },
  Logout() {

  }

}), { name: '@ath' }))