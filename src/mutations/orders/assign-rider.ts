import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axios } from "@/utils/api";

async function assignRider({
  order_id,
  rider_id,
}: {
  order_id: string;
  rider_id: string;
}) {
  const { data } = await axios.post(
    `orders/${order_id}/assign/${rider_id}/rider/`
  );
  return data;
}

export function useAssignRider() {
  const queryClient = useQueryClient();

  return useMutation(assignRider, {
    onSettled() {
      queryClient.invalidateQueries(["orders"]);
    },
    onSuccess() {
      toast.success("Rider assigned successfully");
    },
    onError(error: any) {
      const possibleErrorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.detail ||
        "An error occurred";

      if (typeof possibleErrorMessage === "string") {
        toast.error(possibleErrorMessage);
      } else {
        toast.error("An error occurred");
      }
    },
  });
}
