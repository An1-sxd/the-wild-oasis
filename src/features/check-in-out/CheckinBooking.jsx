import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import useBooking from "../bookings/useBooking";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import useCheckin from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  let { bookingId } = useParams();
  bookingId = +bookingId;

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [isBreakfast, setIsBreakfast] = useState(false);

  const { checkin, isCheckinIn } = useCheckin();
  const { settings: { breakfastPrice } = {}, isPending: isLoadingSettings } =
    useSettings();

  const moveBack = useMoveBack();

  const { isPending: isLoadingBooking, booking = {} } = useBooking(bookingId);

  const { guests, totalPrice, numGuests, hasBreakfast, numNights, isPaid } =
    booking;

  useEffect(() => {
    setConfirmPaid(isPaid || false);
  }, [isPaid]);

  const optionalBreakfastPrice = breakfastPrice * numGuests * numNights;

  const finalPrice = isBreakfast
    ? optionalBreakfastPrice + totalPrice
    : totalPrice;

  if (isLoadingBooking || isLoadingSettings) return <Spinner />;

  function handleCheckin() {
    if (!confirmPaid) return;
    let updatedBookingInfos = {}
    if (isBreakfast) {
      updatedBookingInfos = {
        extrasPrice: optionalBreakfastPrice,
        totalPrice: finalPrice,
        hasBreakfast: true,
      };
      checkin({ bookingId, updatedBookingInfos });
    } else checkin({ bookingId, updatedBookingInfos })
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={isBreakfast}
            onChange={() => {
              setIsBreakfast((b) => !b);
              setConfirmPaid(false);
            }}
            id={"breakfast"}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)} ?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((c) => !c)}
          id={"confirm"}
          disabled={confirmPaid || isCheckinIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(finalPrice)}
          {isBreakfast &&
            ` ( ${formatCurrency(totalPrice)} + ${formatCurrency(
              optionalBreakfastPrice
            )} ) `}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckinIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
