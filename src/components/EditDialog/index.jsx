import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { setAllTasks } from '@/reducers/task';
import { Dialog } from '@mui/material';
import * as Styled from './styled';

export default function EditDialog({ open, data, setOpenDialog }) {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleEditValue = useCallback(
    _.debounce(e => setValue(e.target.value), 300),
    [],
  );

  const handleEditTask = () => {
    const newValue = {
      ...data,
      content: value,
    };
    if (value) {
      dispatch(
        setAllTasks({
          [data.id]: newValue,
        }),
      );
      setOpenDialog(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleEditTask}>
      <Styled.Input
        type='text'
        defaultValue={data.content}
        onChange={handleEditValue}
      />
    </Dialog>
  );
}
