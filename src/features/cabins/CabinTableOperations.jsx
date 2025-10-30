import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  const filterField = "discount";

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "no-discount", label: "No Discount" },
    { value: "with-discount", label: "With Discount" },
  ];

  const sortField = "sortBy";

  const sortOptions = [
    { value: "name-asc", label: "Sort by name (A-Z)" },
    { value: "name-disc", label: "Sort by name (Z-A)" },
    { value: "regularPrice-asc", label: "Sort by price (low first)" },
    { value: "regularPrice-disc", label: "Sort by price (high first)" },
    { value: "maxCapacity-asc", label: "Sort by capacity (low first" },
    { value: "maxCapacity-disc", label: "Sort by capacity (high first" },
  ];

  return (
    <TableOperations>
      <Filter filterField={filterField} filterOptions={filterOptions} />
      <SortBy sortField={sortField} sortOptions={sortOptions} />
    </TableOperations>
  );
}

export default CabinTableOperations;
