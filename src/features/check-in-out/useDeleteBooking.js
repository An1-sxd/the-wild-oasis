import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: removeBooking, isPending: isRemovingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),

    onSuccess: () => {
      toast.success(`booking successfully deleted`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: (error) => {
      console.log(error);
      toast.error(`there was an error : ${error.message}`);
    },
  });

  return { removeBooking, isRemovingBooking };
}

export default useDeleteBooking;
