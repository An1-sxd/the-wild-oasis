import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "../check-in-out/useDeleteBooking";
import Modal from "../../ui/Modal-v1";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  let { bookingId } = useParams();
  bookingId = +bookingId;
  const { checkout, isCheckingOut } = useCheckout();
  const { removeBooking, isRemovingBooking } = useDeleteBooking();

  const moveBack = useMoveBack();

  const { isPending, booking } = useBooking(bookingId);

  if (isPending) return <Spinner />;

  const { status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check In
          </Button>
        )}

        {status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check Out
          </Button>
        )}

        <Modal>
          <Modal.Open opens={"delete"}>
            <Button variant={"danger"}>Delete Booking</Button>
          </Modal.Open>
          <Modal.Window name={"delete"}>
            <ConfirmDelete
              resourceName={"booking"}
              onConfirm={() =>
                removeBooking(bookingId, {
                  onSuccess: () => navigate(-1),
                })
              }
              disabled={isRemovingBooking}
            />
          </Modal.Window>
        </Modal>

        <Button variant="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
