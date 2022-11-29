import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  /* background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')}; */
  flex-grow: 1;
  min-height: 100px;
`;

export { Container, Title, TaskList };
