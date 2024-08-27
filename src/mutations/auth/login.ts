import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, isAxiosError } from "axios";
import { API_TOKEN } from "../../app-constants";
import { toast } from "react-toastify";

type Data = {
  access: string;
  refresh: string;
} & User;
async function login(data: { email: string; password: string }) {
  const { data: response } = await axios.post<{
    data: Data;
  }>("auth/login/", data);

  return response.data;
}

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<
    Data,
    AxiosError<any>,
    {
      email: string;
      password: string;
    }
  >(login, {
    onSuccess(data) {
      if (data.account_type !== "organization") {
        toast.error("You can only login as an organization");
        throw new Error("You can only login as an organization");
      }
      localStorage.setItem(API_TOKEN, data.refresh);
      axios.defaults.headers.common["Authorization"] = "Bearer " + data.access;
      queryClient.setQueriesData(["auth/users/me/"], data);
    },
    onError(e) {
      if (isAxiosError(e)) {
        const possibleErrorMessage =
          e.response?.data?.detail ||
          e.response?.data?.error ||
          e.response?.data?.message;
        toast.error(possibleErrorMessage || "An error occurred");
      }
    },
  });
}
