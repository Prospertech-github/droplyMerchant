import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { axios as api } from '@/utils/api'
import { toast } from 'react-toastify'

async function forgotPassword(data: Record<string, any>) {
  const { data: response } = await axios.post('auth/users/reset_password/', data)

  return response.data
}

export default function useForgotPassword() {
  return useMutation<any, AxiosError<any>, { email: string }>(forgotPassword, {
    onError(e) {
      if (Array.isArray(e.response?.data) && typeof e.response?.data[0] === "string") {
        toast.error(e.response?.data[0])
      }
      else toast.error("An error occurred.")
    }
  })
}

async function resetPassword(data: Record<string, any>) {
  const { data: response } = await axios.post('auth/users/reset_password_confirm/', data)

  return response.data
}

export function useResetPassword() {
  return useMutation<any, AxiosError<any>, Record<string, any>>(resetPassword, {
    onError() {
      toast.error("OOPS! It seems like the link is expired.")
    }
  })
}

async function changePassword(data: Record<string, any>) {
  const { data: response } = await api.post('auth/users/set_password/', data)

  return response.data
}

export function useChangePassword() {
  return useMutation(changePassword)
}
