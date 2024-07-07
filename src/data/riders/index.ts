import { useQuery } from "@tanstack/react-query";


export function useRiders() {
  return useQuery<Rider[]>(['riders', ""])
}

export function useRider(id: string) {
  return useQuery<Rider>(['riders', id])
}

export function useRiderAnalytics(id: string) {
  return useQuery<{
    monthly: Record<string, number>,
    yearly: Record<string, number>,
  }>([
    "analytics/riders", id, "rider-deliveries/"
  ])
}