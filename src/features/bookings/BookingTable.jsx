import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import useBookings from "./useBookings";
import Spinner from "../../ui/Spinner";
// import Menus from "../../ui/Menus";

function BookingTable() {
  const { isPending, bookings = [] } = useBookings();

  // const [searchParams, setSearchParams] = useSearchParams();

  // // 1️⃣_ ::Filtering::

  // const bookingFilter = searchParams.get("status") || "all";

  // const filteredBookings =
  //   bookingFilter === "all"
  //     ? bookings
  //     : bookings.filter((booking) => booking.status === bookingFilter); 
  //     // <<filter>> by **bookingFilter (status)** i get from <<url>>

  if (isPending) return <Spinner />;

  return (
    // <Menus>
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={bookings}
        render={(booking) => <BookingRow key={booking.id} booking={booking} />}
      />
    </Table>
    // </Menus>
  );
}

export default BookingTable;
