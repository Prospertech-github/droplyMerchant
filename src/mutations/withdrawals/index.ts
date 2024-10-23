import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axios } from "@/utils/api";

async function createWithdrawal(data: Record<string, any>) {
  const { data: response } = await axios.post(
    `withdrawal/create-request/`,
    data
  );

  return response.data;
}

export function useCreateWithdrawal() {
  const queryClient = useQueryClient();

  return useMutation(createWithdrawal, {
    onSuccess() {
      queryClient.invalidateQueries(["payments/wallet-history/"]);
      queryClient.invalidateQueries(["payments/wallet/get-balance/"]);
    },
    onError() {
      toast.error("An error occured");
    },
  });
}
