import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryClient = useQueryClient();

  const updatedStatus = {
    status: "checked-out",
  };

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => updateBooking(bookingId, updatedStatus),

    onSuccess: (data) => {
      toast.success(`booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: (error) => {
      console.log(error);
      toast.error(`there was an error : ${error.message}`);
    },
  });

  return { checkout, isCheckingOut };
}

export default useCheckout;
