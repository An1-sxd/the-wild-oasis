import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useCabins() {
  const {
    data: cabins,
    isPending,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins, //promise
  });

  return { isPending, cabins };
}

export default useCabins;
