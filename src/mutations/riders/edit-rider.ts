import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/utils/api";
import { toast } from "react-toastify";

async function editRider(rider: Record<string, string>) {
  const { data } = await axios.patch(`riders/${rider.id}/`, rider);
  return data;
}

export function useEditRider() {
  const queryClient = useQueryClient();
  return useMutation(editRider, {
    onSettled() {
      queryClient.invalidateQueries(["riders"]);
    },
    onSuccess() {
      toast.success("Rider edited successfully");
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

async function deleteRider(id: string) {
  const { data } = await axios.delete(`riders/${id}/`);
  return data;
}

export function useDeleteRider() {
  const queryClient = useQueryClient();
  return useMutation(deleteRider, {
    onSettled() {
      queryClient.invalidateQueries(["riders"]);
    },
    onSuccess() {
      toast.success("Rider deleted successfully");
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
