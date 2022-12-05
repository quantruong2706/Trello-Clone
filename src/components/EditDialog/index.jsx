import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { setAllTasks } from '@/reducers/task';
import { Dialog } from '@mui/material';
import { doc, updateDoc, deleteDoc, arrayRemove } from 'firebase/firestore';
import db from '@server/firebase';
import * as Styled from './styled';
import { async } from '@firebase/util';

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
