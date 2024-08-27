import { useQuery } from "@tanstack/react-query";

export function useNotifications(searchParams: {
  limit: string;
  offset: string;
}) {
  const params = new URLSearchParams({ ...searchParams });

  return useQuery<
    PaginatedResponse<
      {
        created_at: string;
        id: string;
        is_read: boolean;
        message: string;
      }[]
    >
  >(["notifications", `?${params.toString()}`]);
}
