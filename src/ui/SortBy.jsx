import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ sortField, sortOptions }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(e) {
    searchParams.set(sortField, e.target.value);
    setSearchParams(searchParams);
  }

  const cabinSortBy = searchParams.get("sortBy") || "name-asc";

  return (
    <Select
      type={"white"}
      sortOptions={sortOptions}
      value={cabinSortBy}
      onChange={handleClick}
    />
  );
}

export default SortBy;
