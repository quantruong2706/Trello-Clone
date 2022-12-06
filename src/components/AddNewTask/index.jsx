import { Input, Button } from '@mui/material'
import * as Styled from './styled'

export default function AddNewTask({ newBoardRef, handleAddNew, placeholder = 'Please input' }) {
  return (
    <Styled.WrapperAddTask>
      <Input inputRef={newBoardRef} placeholder={placeholder}></Input>
      <Button variant="outlined" onClick={handleAddNew}>
        Add
      </Button>
    </Styled.WrapperAddTask>
  )
}
