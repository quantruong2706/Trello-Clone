import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  /* background-color: ${props => (props.isDragging ? 'lightGreen' : 'white')}; */

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;
export { Container, Handle };
