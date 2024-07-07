import { useQuery } from "@tanstack/react-query";

export default function useDashboard() {
  return useQuery<{
    order: {
      total_orders_all_time: number;
      total_orders_this_month: number;
      total_orders_last_month: number;
    };
    revenue: {
      total_revenue_all_time: number;
      total_revenue_this_month: number;
      total_revenue_last_month: number;
    };
    top_riders: {
      user__first_name: string;
      user__last_name: string;
      user__email: string;
      user__phone: string;
      order_count: number;
    }[];
    total_riders: number;
    rating: number;
  }>(["analytics/merchant-dashboard/"]);
}

export function useDashboardChart() {
  return useQuery<K>(["analytics/merchant-chart/"]);
}

export function useDashboardRevenueChart() {
  return useQuery<K>(["analytics/merchant-revenue-chart/"]);
}

type K = {
  "7_days": {
    day: string;
    date: string;
    confirmed: number;
    "in-transit": number;
    picked: number;
    completed: number;
  }[];
  monthly: F;
  yearly: F;
};

type F = Record<
  string,
  {
    confirmed: number;
    "in-transit": number;
    picked: number;
    completed: number;
  }
>;
