import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { useContext } from "react";
import { ModalContext } from "./Modal-v1";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

// function ConfirmDelete({ resourceName, onConfirm, disabled }) {
function ConfirmDelete({ cabin, onConfirm, disabled, onClose }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete Cabin {cabin.name}</Heading>
      <p>
        Are you sure you want to delete this {cabin.name} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button variant="secondary" disabled={disabled} onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
