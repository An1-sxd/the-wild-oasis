import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
    const queryClient = useQueryClient();

  const { mutate: mutateCreate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess() {
      toast.success("New Cabin Successfully created!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { mutateCreate, isCreating };
}

export default useCreateCabin;
