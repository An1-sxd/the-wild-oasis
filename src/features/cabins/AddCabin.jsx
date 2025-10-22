import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal-v1";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open>
        <Button>add a new cabin</Button>
      </Modal.Open>
      <Modal.Window>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );

  // const [isOpenModal, setIsOpenModal] = useState(false);

  // return (
  //   <>
  //     <Button onClick={() => setIsOpenModal((s) => !s)}>add a new cabin</Button>
  //     {/* {isOpenModal && <CreateCabinForm />} */}
  //     {isOpenModal && (
  //       <Modal onClose={() => setIsOpenModal(false)}>
  //         <CreateCabinForm onClose={() => setIsOpenModal(false)} />
  //       </Modal>
  //     )}
  //   </>
  // );
}

export default AddCabin;
