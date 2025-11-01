import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const updatedStatus = {
    status: "checked-in",
    isPaid: true,
  };

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, updatedBookingInfos }) =>
      updateBooking(bookingId, { ...updatedStatus, ...updatedBookingInfos }),

    onSuccess: (data) => {
      toast.success(`booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate(`/bookings`);
    },

    onError: (error) => {
      console.log(error);
      toast.error(`there was an error : ${error.message}`);
    },
  });

  return { checkin, isCheckingIn };
}

export default useCheckin;
