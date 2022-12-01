import React, { Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import * as Styled from './styled';

function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <Styled.Container ref={provided.innerRef} {...provided.draggableProps}>
          <p {...provided.dragHandleProps}>{task.content}</p>
        </Styled.Container>
      )}
    </Draggable>
  );
}

export default Task;
