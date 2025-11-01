import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate()

  const { mutate: login, isPending: isLogingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      console.log(user)
      navigate("/dashboard")
    },

    onError: (error) => {
      console.log(error);
      toast.error("provided email or password are incorrect")
    },
  });

  return { login, isLogingIn };
}

export default useLogin;
