import { useQuery } from "@tanstack/react-query";

export function useWalletBalance() {
  return useQuery<{ balance: number }>(["payments/wallet/get-balance/"]);
}

export function useWalletHistory() {
  return useQuery<WHistory[]>(["payments/wallet-history/"]);
}

export function useWalletDashboard() {
  return useQuery<{
    "credits": {
      "all_time_credit": number
      "this_month_credit": number
      "last_month_credit": number
    },
    "withdrawals": {
      "all_time_withdrawal": number
      "this_month_withdrawal": number
      "last_month_withdrawal": number
    }
  }>(["analytics/merchant-wallet-dashboard/"]);
}