import styled from 'styled-components'

const WrapperAddTask = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px;
  padding: 8px;
  height: fit-content;
  background-color: white;
  border-radius: 5px;
  width: 300px;
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
`

export { WrapperAddTask }
