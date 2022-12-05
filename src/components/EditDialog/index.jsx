import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { setAllTasks } from '@/reducers/task';
import { Dialog } from '@mui/material';
import { doc, updateDoc, deleteDoc, arrayRemove } from 'firebase/firestore';
import db from '@server/firebase';
import * as Styled from './styled';
import { async } from '@firebase/util';

export default function EditDialog({ open, data, setOpenDialog, boardId }) {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleEditValue = useCallback(
    _.debounce(e => setValue(e.target.value), 300),
    [],
  );

  const handleEditTask = useCallback(async () => {
    if (value) {
      const newValue = {
        content: value,
      };
      const frankDocRef = doc(db, 'tasks', data.id);
      await updateDoc(frankDocRef, newValue);
    }
    setOpenDialog(false);
  });

  const handleDeleteTask = useCallback(async () => {
    const washingtonRef = doc(db, 'boards', boardId);
    await updateDoc(washingtonRef, {
      taskIds: arrayRemove(data.id),
    });
    await deleteDoc(doc(db, 'tasks', data.id));
  });

  return (
    <Dialog open={open} onClose={handleEditTask}>
      <Styled.Input
        type='text'
        defaultValue={data.content}
        onChange={handleEditValue}
      />
      <Styled.Container>
        <Styled.Delete onClick={handleDeleteTask}>Delete</Styled.Delete>
      </Styled.Container>
    </Dialog>
  );
}
