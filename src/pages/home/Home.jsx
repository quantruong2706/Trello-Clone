import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { decrement, increment } from '@/reducers/counter';
import { selectorCounter } from '@/selectors';
import initialData from '@assets/datasets/initial-data';
import Board from '@components/Board';
import * as Styled from './styled';

export function Home() {
  const [data, setData] = useState(initialData);
  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const board = data.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newBoard = {
      ...board,
    };
  };

  return (
    <DragDropContext onDragEnd={() => onDragEnd}>
      <Styled.Container>
        {data.boardOrder.map((boardId, index) => {
          const board = data.boards[boardId];
          const tasks = board.taskIds.map(taskId => data.tasks[taskId]);
          return (
            <Board key={board.id} board={board} tasks={tasks} index={index} />
          );
        })}
      </Styled.Container>
    </DragDropContext>
  );
}
