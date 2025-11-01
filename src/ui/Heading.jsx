import styled, { css } from "styled-components";

const Heading = styled.h1`
  color: var(-color-grey-900);
  font-weight: 600;
  text-transform: capitalize;

  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.5rem;
    `}

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3.5rem;
    `}
`;
export default Heading;
