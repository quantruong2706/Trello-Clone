import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
  width: 300px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? '#e6e6e6' : 'inherit')};
  flex-grow: 1;
  min-height: 100px;
`;
const WrapperAddTask = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px;
  button {
    width: 18%;
    height: 30px;
    cursor: pointer;
  }
  input {
    height: 30px;
    width: 80%;
    padding: 3px;
  }
`;

export { Container, Title, TaskList, WrapperAddTask };
