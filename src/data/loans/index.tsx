import { useQuery } from "@tanstack/react-query";

export default function useLoans() {
  return useQuery<Loan[]>(["loans/"]);
}
