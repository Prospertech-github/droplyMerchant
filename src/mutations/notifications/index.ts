import { useQueryClient, useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { axios } from "@/utils/api";
import { toast } from "react-toastify";

async function changeNotificationStatus({
  id,
}: {
  id: string;
  is_read: boolean;
}) {
  const { data: response } = await axios.post(`notifications/${id}/read/`);

  return response.data;
}

export function useChangeNotificationStatus(searchParams: {
  limit: string;
  offset: string;
}) {
  const params = new URLSearchParams({ ...searchParams });

  const queryClient = useQueryClient();

  return useMutation(changeNotificationStatus, {
    onMutate: async (updatedNotification) => {
      const queryKey = ["notifications", `?${params.toString()}`];

      await queryClient.cancelQueries(queryKey);

      const previousNotifications =
        queryClient.getQueryData<Paginated<Organization>>(queryKey);

      queryClient.setQueryData(
        queryKey,
        (old: Paginated<Organization> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            results: old.results.map((notification) =>
              notification.id === updatedNotification.id
                ? { ...notification, is_read: updatedNotification.is_read }
                : notification
            ),
          };
        }
      );

      return { previousNotifications };
    },
    onError: (error, _, context) => {
      const queryKey = ["notifications", `?${params.toString()}`];
      queryClient.setQueryData(queryKey, context?.previousNotifications);

      if (isAxiosError(error)) {
        toast.error(error.response?.data || error.response?.data?.error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([
        ["notifications", `?${params.toString()}`],
      ]);
    },
  });
}
