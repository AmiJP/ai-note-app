import { getAccount } from "@/api/user/getAccount";
import { useQuery } from "@tanstack/react-query";

export const useAccount = ({ enabled = true }: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getAccount,
    enabled: enabled,
  });
};
