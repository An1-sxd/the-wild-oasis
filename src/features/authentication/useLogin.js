import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLogingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      console.log(user.user); // here the <<user infos>>

      queryClient.setQueriesData({ queryKey: ["user"] }, user.user);
      // queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },

    onError: (error) => {
      console.log(error);
      toast.error("provided email or password are incorrect");
    },
  });

  return { login, isLogingIn };
}

export default useLogin;
