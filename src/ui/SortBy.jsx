import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  const cabinSortBy = searchParams.get("sortBy") || "name-asc";

  return (
    <Select
      type={"white"}
      options={options}
      value={cabinSortBy}
      onChange={handleClick}
    />
  );
}

export default SortBy;
