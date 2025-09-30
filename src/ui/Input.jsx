import styled from "styled-components";

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--color-grey-300);

  &::placeholder {
    color: var(--color-grey-500);
    font-weight: 500;
  }
`;
export default Input;
