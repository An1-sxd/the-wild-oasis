import { Link, NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBar from "./SideBar";
import Header from "./Header";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100dvh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  background-color: green;
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-grey-50);
`;

// const API_URL =
//   "https://sqyfnfdqixejekchzicd.supabase.co/rest/v1/cabins?select=*";
// const API_KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxeWZuZmRxaXhlamVrY2h6aWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNDU0MDEsImV4cCI6MjA3NDgyMTQwMX0.upLzpvW20_DfDtlCnxTeT2-BO5w4QN3l84ol6F_t_G0"; // 👈 replace with your anon public key

// async function getCabins() {
//   const res = await fetch(API_URL, {
//     headers: {
//       apikey: API_KEY,
//       Authorization: `Bearer ${API_KEY}`,
//     },
//   });

//   const data = await res.json();
//   console.log(data);
// }

// getCabins();

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <SideBar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
