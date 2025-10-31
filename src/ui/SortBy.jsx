import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  const sortByValue = searchParams.get("sortBy") || "name-asc";

  return (
    <Select
      type={"white"}
      options={options}
      value={sortByValue}
      onChange={handleClick}
    />
  );
}

export default SortBy;
