import { Input, Button } from '@mui/material'
import * as Styled from './styled'

export default function AddNew({ addNewRef, handleAddNew, placeholder = 'Please input' }) {
  return (
    <Styled.WrapperAddTask>
      <Input inputRef={addNewRef} placeholder={placeholder}></Input>
      <Button variant="outlined" onClick={handleAddNew}>
        Add
      </Button>
    </Styled.WrapperAddTask>
  )
}
