import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/utils/api"
import { toast } from "react-toastify";

async function addRider(rider: Record<string, string>) {
  const { data } = await axios.post("auth/rider/signup/", rider)
  return data
}

export function useAddRider() {
  const queryClient = useQueryClient()
  return useMutation(addRider, {
    onSettled() {
      queryClient.invalidateQueries(["riders"])
    },
    onSuccess() {
      toast.success("Rider added successfully")
    },
    onError(error: any) {
      const possibleErrorMessage = error?.response?.data?.message || error?.response?.data?.error || error?.response?.data?.detail || "An error occurred"

      if (typeof possibleErrorMessage === "string") {
        toast.error(possibleErrorMessage)
      } else {
        toast.error("An error occurred")
      }
    },
  })
}