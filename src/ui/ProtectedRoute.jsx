import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // ::1_ Load The Authenticated User::
  const { isGettingUser, isAuthenticated } = useUser();

  // ##step 2 and 3 should be swapped , but since hooks (useEffect) cannot be called conditionally, so they're like this : ##

  // ::2_ if There Is No Authenticated User , Return To Login Page::
  useEffect(() => {
    if (!isAuthenticated && !isGettingUser) navigate("/login"); // we used useEffect , because : <<navigating>> during <<render>> is a <<bad>> pattern
  }, [isAuthenticated, isGettingUser, navigate]);

  // ::3_ while loading,show a spinner::
  if (isGettingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // ::4_ if There Is User , Ender The App::
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
