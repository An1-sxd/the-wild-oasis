import { useRef } from "react";
import { useEffect } from "react";

function useClickDetect(setState) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("outside click detect");
        setState(false);
      }
    }

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [ref, setState]);

  return ref;
}

export default useClickDetect;
