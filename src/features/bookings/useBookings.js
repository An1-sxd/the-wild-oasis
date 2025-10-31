import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1️⃣_ ::API-Side Filtering::

  const filterValue = searchParams.get("status") || "all";
  const filter =
    filterValue === "all" ? null : { field: "status", value: filterValue };
  // filterValue === { field: "totalPrice", value: 5000, method: "gte" };

  // const filters = [
  //   filterValue === "all" ? null : { field: "status", value: filterValue },
  //   { field: "totalPrice", value: 5000, method: "gte" },
  // ];

  // 2️⃣_ ::API-Side Sorting::

  const sortValue = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortValue.split("-");

  const isAscending = direction === "asc" ? true : false;

  const sort = { field, order: isAscending };

  const {
    data: bookings,
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort],
    queryFn: () => getBookings({ filter, sort }), //promise
  });

  return { isPending, bookings };
}

export default useBookings;
