import { useRef } from "react";
import { useEffect } from "react";

function useClickDetect(setIsOpenModal) {
  const modalRef = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (modalRef.current && !modalRef.current.contains(e.target))
          setIsOpenModal(false);
      }

      document.addEventListener("click", handleClick, true);

      return () => document.removeEventListener("click", handleClick);
    },
    [modalRef, setIsOpenModal]
  );

  return modalRef;
}

export default useClickDetect;
