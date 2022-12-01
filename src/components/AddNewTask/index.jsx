import React, { useCallback } from 'react';
import Task from '@components/Task';
import _ from 'lodash';
import * as Styled from './styled';

export default function AddNewTask({
  handleAddNew,
  handleChangeValue,
  placeholder = 'Please input',
}) {
  return (
    <Styled.WrapperAddTask>
      <input placeholder={placeholder} onChange={handleChangeValue}></input>
      <button onClick={handleAddNew}>Add</button>
    </Styled.WrapperAddTask>
  );
}
