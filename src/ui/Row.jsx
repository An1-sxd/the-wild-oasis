import styled, { css } from "styled-components";

const horizontalStyle = (props) =>
  props.type === "horizontal" &&
  css`
    align-items: center;
  `;

const verticalStyle = ({ type = "vertical" }) =>
  type === "vertical" &&
  css`
    flex-direction: column;
    gap: 15px;
  `;

const Row = styled.div`
  display: flex;
  justify-content: space-between;

  ${horizontalStyle}
  ${verticalStyle}
`;

export default Row;
