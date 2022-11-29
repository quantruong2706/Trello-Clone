import React, { Fragment } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from '@components/Task';
import * as Styled from './styled';

function Board({ board, tasks, index }) {
  return (
    <Styled.Container>
      <Styled.Title>{board.title}</Styled.Title>
      <Droppable droppableId={board.id} index={index}>
        {provided => (
          <Styled.TaskList
          ref={provided.innerRef}
          {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </Styled.TaskList>
        )}
      </Droppable>
    </Styled.Container>
  );
}

export default Board;
