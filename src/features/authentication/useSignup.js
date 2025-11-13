import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ email, password, fullName }),

    onSuccess: () => {
      toast.success(
        "account created successfully! please verify the new account form the user's email address"
      );
    },
  });

  return { signup, isSigningUp };
}

export default useSignup;
