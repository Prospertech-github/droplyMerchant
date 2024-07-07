import { axios } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";


async function AddbankDetails(data: Record<string, any>) {
  const { data: response } = await axios.post(`payments/user-account/`, data);

  return response.data;
}

export function useAddbankDetails() {
  const queryClient = useQueryClient();

  return useMutation(AddbankDetails, {
    onSuccess() {
      queryClient.invalidateQueries(["payments/user-account/"]);
    },
  });
}