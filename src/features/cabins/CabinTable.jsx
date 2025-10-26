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
  const { isPending, cabins } = useCabins();

  const [searchParams, setSearchParams] = useSearchParams();

  const cabinFilter = searchParams.get("discount") || "all";

  const filteredCabins =
    cabinFilter === "all"
      ? cabins
      : cabinFilter === "no-discount"
      ? cabins.filter((cabin) => cabin.discount === 0)
      : cabins.filter((cabin) => cabin.discount !== 0);

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
          data={filteredCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
