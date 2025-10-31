import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1️⃣_ ::Filtering::

  const filterValue = searchParams.get("status") || "all";
  const filter =
    filterValue === "all" ? null : { field: "status", value: filterValue };
  // filterValue === { field: "totalPrice", value: 5000, method: "gte" };

  // const filters = [
  //   filterValue === "all" ? null : { field: "status", value: filterValue },
  //   { field: "totalPrice", value: 5000, method: "gte" },
  // ];

  const {
    data: bookings,
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }), //promise
  });

  return { isPending, bookings };
}

export default useBookings;
