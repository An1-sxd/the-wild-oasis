import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: mutateUpdate, isPending: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess() {
      toast.success("Settings successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { mutateUpdate, isUpdating };
}

export default useUpdateSettings;
