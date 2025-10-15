import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: mutateEdit, isPending: isEditing } = useMutation({
    mutationFn: ({ id, editedCabin }) => EditCabin(id, editedCabin),
    onSuccess() {
      toast.success("Cabin successfully edited!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { mutateEdit, isEditing };
}

export default useEditCabin;
