import { useQuery } from "@tanstack/react-query";

export function useOrders(filters?: {
  rider?: string,
}) {

  return useQuery<Order[]>(['orders', `?${new URLSearchParams(filters)}`])
}

export function useOrder(id: string) {
  return useQuery<Order>(['orders', id])
}