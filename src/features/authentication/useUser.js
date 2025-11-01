import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useUser() {
  const { data: user, isPending: isGettingUser } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { user, isGettingUser,isAuthenticated : user?.role === "authenticated" };
}

export default useUser;
