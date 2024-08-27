import { useQuery } from "@tanstack/react-query";

export function useNotifications(searchParams: {
  limit: string;
  offset: string;
}) {
  const params = new URLSearchParams({ ...searchParams });

  return useQuery<Order[]>(["notifications/", `?${params.toString()}`]);
}
