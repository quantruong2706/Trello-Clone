import React, { useCallback } from 'react';
import Task from '@components/Task';
import _ from 'lodash';
import { Input, Button } from '@mui/material';
import * as Styled from './styled';

export default function AddNewTask({
  handleAddNew,
  handleChangeValue,
  placeholder = 'Please input',
}) {
  return (
    <Styled.WrapperAddTask>
      <Input placeholder={placeholder} onChange={handleChangeValue}></Input>
      <Button variant='outlined' onClick={handleAddNew}>
        Add
      </Button>
    </Styled.WrapperAddTask>
  );
}
