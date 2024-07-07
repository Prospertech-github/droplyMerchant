import { useQuery } from "@tanstack/react-query";

export function useBanks() {
  return useQuery<{ data: { code: string, name: string }[] }>(["payments/banks/"]);
}

export function useBankDetails() {
  return useQuery(["payments/user-account/"]);
}