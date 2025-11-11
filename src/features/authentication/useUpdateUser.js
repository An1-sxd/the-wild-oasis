import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: ({ fullName, password, avatar }) =>
      updateCurrentUser({ fullName, password, avatar }),
    onSuccess({ user }) {
      toast.success("user account successfully updated!");
      // queryClient.setQueryData("user", user);

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { updateUser, isUpdatingUser };
}

export default useUpdateUser;
