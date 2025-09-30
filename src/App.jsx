// import { styled } from "styled-components";
// import GlobalStyles from "./styles/GlobalStyles";
// import Button from "./ui/Button";
// import Heading from "./ui/Heading";
// import Row from "./ui/Row";
// import Input from "./ui/Input";

// const StyledApp = styled.div`
//   padding: 20px;
// `;

// function App() {
//   return (
//     <>
//       <GlobalStyles />
//       <StyledApp>
//         <Row type={"vertical"}>
//           <Row type={"horizontal"}>
//             <Heading as={"h1"}>The Wild Oasis</Heading>
//             <div>
//               <Heading as={"h2"}>Check in and out</Heading>
//               <Button variant={"primary"} size={"medium"}>
//                 Check in
//               </Button>
//               <Button variant={"danger"} size={"medium"}>
//                 Check out
//               </Button>
//             </div>
//           </Row>

//           <Row type={"vertical"}>
//             <Heading as={"h3"}>Form</Heading>
//             <form>
//               <Input type="number" placeholder="Number of Guests" />
//               <Input type="number" placeholder="Number of Guests" />
//             </form>
//           </Row>
//         </Row>
//       </StyledApp>
//     </>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Cabins from "./pages/Cabins";
import PageNotFound from "./pages/PageNotFound";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/cabins" element={<Cabins />} />
          </Route>
            <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
