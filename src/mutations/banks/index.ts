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

async function updateBankDetails(data: Record<string, any>) {
  const { data: response } = await axios.post(`payments/user-account/`, data); // Assuming the endpoint is `PUT`
  return response.data;
}

export function useUpdateBankDetails() {
  const queryClient = useQueryClient();

  return useMutation(updateBankDetails, {
    onSuccess(data) {
      console.log("Bank details updated successfully!", data);
      queryClient.invalidateQueries(["payments/user-account/"]); // Refetch the bank details query
    },
    onError(error) {
      // Handle error (logging it here too if needed)
      console.error("Error updating bank details:", error);
    }
  });
}
