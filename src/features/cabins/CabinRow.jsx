import styled from "styled-components";
import { HiTrash, HiPencil } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import Table from "../../ui/Table";
import Menus, { MenuContext } from "../../ui/Menus";
import { useContext } from "react";
import Modal from "../../ui/Modal-v1";
import ConfirmDelete from "../../ui/ConfirmDelete";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, name, image, regularPrice, maxCapacity, discount } = cabin;

  const { mutateDelete, isDeleting } = useDeleteCabin();
  const { mutateCreate, isCreating } = useCreateCabin();

  const { setOpenedItemMenu } = useContext(MenuContext);

  return (
    // <Table.Row role="row" className="cabin-row">
    //   <Img src={image} />
    //   <Cabin>{name}</Cabin>
    //   <div>Fits up to {maxCapacity} guests</div>
    //   <Price>{formatCurrency(regularPrice)}</Price>

    //   {discount ? (
    //     <Discount>{formatCurrency(discount)}</Discount>
    //   ) : (
    //     <span>&mdash;</span>
    //   )}
    //   <Menus.Menu>
    //     <Menus.Toggle id={id} />
    //     <Menus.List id={id}>
    //       <Menus.Btn
    //         icon={<HiSquare2Stack />}
    //         onClick={() =>
    //           mutateCreate({
    //             name: "copy of : " + name,
    //             maxCapacity,
    //             regularPrice,
    //             discount,
    //             description: cabin.description,
    //             image,
    //           })
    //         }
    //         disabled={isCreating}
    //
    //       >
    //         Duplicate
    //       </Menus.Btn>

    //       <EditCabin cabin={cabin}>
    //         <Menus.Btn
    //           icon={<HiPencil />}
    //
    //         >
    //           Edit
    //         </Menus.Btn>
    //       </EditCabin>

    //       <Menus.Btn
    //         icon={<HiTrash />}
    //         onClick={() => mutateDelete(id)}
    //         disabled={isDeleting}
    //
    //       >
    //         {/* <DeleteCabin
    //           cabin={cabin}
    //           onConfirm={() => mutateDelete(id)}
    //           disabled={isDeleting}
    //         /> */}
    //         Delete
    //       </Menus.Btn>
    //     </Menus.List>
    //   </Menus.Menu>
    // </Table.Row>

    <Table.Row role="row" className="cabin-row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>

      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <div id="menu">
        <Modal>
          {/* Menu */}
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              {/* duplicate */}
              <Menus.Btn
                icon={<HiSquare2Stack />}
                onClick={() =>
                  mutateCreate({
                    name: "copy of : " + name,
                    maxCapacity,
                    regularPrice,
                    discount,
                    description: cabin.description,
                    image,
                  })
                }
                disabled={isCreating}
              >
                Duplicate
              </Menus.Btn>

              {/* edit */}
              <Modal.Open opens={"edit"}>
                <Menus.Btn icon={<HiPencil />}>Edit</Menus.Btn>
              </Modal.Open>
              {/* delete */}
              <Modal.Open opens={"delete"}>
                <Menus.Btn icon={<HiTrash />}>Delete</Menus.Btn>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
          {/* Menu */}

          {/* edit modal */}
          <Modal.Window name={"edit"}>
            <CreateCabinForm cabin={cabin} />
          </Modal.Window>
          {/* edit modal */}

          {/* delete modal */}
          <Modal.Window name={"delete"}>
            <ConfirmDelete
              resourceName={"cabin"}
              onConfirm={() => mutateDelete(id)}
              disabled={isDeleting}
            />
          </Modal.Window>
          {/* delete modal */}
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
