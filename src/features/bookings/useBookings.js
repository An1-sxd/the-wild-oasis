import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const queryClient = useQueryClient();
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

  // 3️⃣_ ::Pagination (Api-Side ofc)::

  const page = !searchParams.get("page") ? 1 : +searchParams.get("page");

  // ::Query::

  const {
    data: { data: bookings, count } = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page],
    queryFn: () => getBookings({ filter, sort, page }), //promise
  });

  // ::Prefetching::

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page !== pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }), //promise
    });

  if (page !== 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }), //promise
    });

  return { isPending, bookings, count };
}

export default useBookings;
