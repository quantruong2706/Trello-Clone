import styled from 'styled-components';

const Container = styled.div`
  display: flex;
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

const Title = styled.h2`
  text-align: center;
  margin: 20px;
`;

export { Container, WrapperAddTask, Title };
