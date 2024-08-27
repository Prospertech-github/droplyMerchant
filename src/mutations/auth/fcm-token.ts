import axios, { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

async function updateFCMToken(data: { fcm_token: string }) {
  const { data: response } = await axios.patch("auth/fcm-token/", data);

  return response.data;
}

export default function useUpdateFCMToken() {
  return useMutation(updateFCMToken, {
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
