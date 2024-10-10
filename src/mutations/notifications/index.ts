import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axios } from "@/utils/api";

async function changeNotificationStatus(data: {
  id: string;
  is_read: boolean;
}) {
  const { data: response } = await axios.post(`notification/status`, data);

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
    // onError: (error, updatedNotification, context) => {
    //   const queryKey = ["notifications", `?${params.toString()}`];
    //   queryClient.setQueryData(queryKey, context?.previousNotifications);
    // },
    // onSettled: () => {
    //   queryClient.invalidateQueries([
    //     ["notifications", `?${params.toString()}`],
    //   ]);
    // },
  });
}
