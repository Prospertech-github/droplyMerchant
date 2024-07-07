import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axios } from '@/utils/api'

async function createWithdrawal(data: Record<string, any>) {
  const { data: response } = await axios.post(`payments/withdraw/`, data);

  return response.data;
}

export function useCreateWithdrawal() {
  const queryClient = useQueryClient();

  return useMutation(createWithdrawal, {
    onSuccess() {
      queryClient.invalidateQueries(['payments/wallet-history/']);
      queryClient.invalidateQueries(['payments/wallet/get-balance/']);
    },
  });
}