import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/utils/api";

async function AddLoanDetails(data: Record<string, any>) {
  const { data: response } = await axios.post(`loans/`, [data]);

  return response.data;
}

export function useAddLoanDetails() {
  const queryClient = useQueryClient();

  return useMutation(AddLoanDetails, {
    onSuccess() {
      queryClient.invalidateQueries(["loans/"]);
    },
  });
}