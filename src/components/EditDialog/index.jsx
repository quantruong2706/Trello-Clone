import { Dialog } from '@mui/material';
import * as Styled from './styled';

export default function EditDialog({
  editTaskRef,
  open,
  data,
  handleEditTask,
  handleDeleteTask,
}) {
  return (
    <Dialog open={open} onClose={handleEditTask}>
      <Styled.Input ref={editTaskRef} type='text' defaultValue={data} />
      <Styled.Container>
        <Styled.Delete onClick={handleDeleteTask}>Delete</Styled.Delete>
      </Styled.Container>
    </Dialog>
  );
}
