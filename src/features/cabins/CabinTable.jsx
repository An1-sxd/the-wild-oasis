import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
// `;

function CabinTable() {
  const { isPending, cabins = [] } = useCabins();

  const [searchParams, setSearchParams] = useSearchParams();

  // 1️⃣_ ::Filtering::

  const cabinFilter = searchParams.get("discount") || "all";

  const filteredCabins =
    cabinFilter === "all"
      ? cabins
      : cabinFilter === "no-discount"
      ? cabins.filter((cabin) => cabin.discount === 0)
      : cabins.filter((cabin) => cabin.discount !== 0);

  // 2️⃣_ ::Sorting::

  const cabinSortBy = searchParams.get("sortBy") || "name-asc";

  // const sortedCabins = [...filteredCabins].sort((cabin1, cabin2) => {
  //   switch (cabinSortBy) {
  //     case "name-asc":
  //       return cabin1.name.localeCompare(cabin2.name);
  //     case "name-disc":
  //       return cabin2.name.localeCompare(cabin1.name);
  //     case "price-asc":
  //       return cabin1.regularPrice - cabin2.regularPrice;
  //     case "price-disc":
  //       return cabin2.regularPrice - cabin1.regularPrice;
  //     case "capacity-asc":
  //       return cabin1.maxCapacity - cabin2.maxCapacity;
  //     case "capacity-disc":
  //       return cabin2.maxCapacity - cabin1.maxCapacity;
  //     default:
  //       return filteredCabins;
  //   }
  // });

  // 2️⃣_ ::better Sorting Logic::

  const [field, direction] = cabinSortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = [...filteredCabins].sort(
    (cabin1, cabin2) => (cabin1[field] - cabin2[field]) * modifier // by ignoring case of <<name>> is <<String>> (copy of : 001)
  );

  if (isPending) return <Spinner />;

  return (
    // <<without Table Modal>> :
    // <Table role="table">
    //   <TableHeader role="row">
    //     <div></div>
    //     <div>cabin</div>
    //     <div>capacity</div>
    //     <div>price</div>
    //     <div>discount</div>
    //   </TableHeader>
    //   {cabins.map((cabin) => (
    //     <CabinRow key={cabin.id} cabin={cabin} />
    //   ))}
    // </Table>

    // <<without Table Modal>> :

    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>cabin</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
