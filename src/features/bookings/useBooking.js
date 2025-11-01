import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

function useBooking(bookingId) {
  const {
    data: booking,
    isPending,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId), //promise
    retry: false,
  });

  return { isPending, booking };
}

export default useBooking;
