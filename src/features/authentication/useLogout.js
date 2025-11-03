import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLogingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // QueryClient.invalidateQueries({ queryKey: ["user"] }); // <<>>
      queryClient.removeQueries(); // since we logout : then delete all queries ..
      navigate("/login", { replace: true }); // ****
    },
  });

  return { logout, isLogingOut };
}
