import styled from 'styled-components';

const Input = styled.input`
  border: none;
  margin: 20px;
  font-weight: bold;
  font-size: 18px;
  &:focus {
    padding: 8px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px;
`

const Delete = styled.button`
  width: fit-content;
  border: 1px solid red;
  background: red;
  color: #fff;
  border-radius: 5px;
  padding: 5px 8px;
  cursor: pointer;
`;

export { Input, Delete, Container };
