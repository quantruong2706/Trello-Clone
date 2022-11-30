import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { selectorTask } from '@/selectors';
import { setAllTasks, setAllBoards, setBoardOrder } from '@/reducers/task';
import initialData from '@assets/datasets/initial-data';
import Board from '@components/Board';
import AddNewTask from '@components/AddNewTask';
import { makeId } from '@/utils/helper';
import _ from 'lodash';

import * as Styled from './styled';

export function Home() {
  const [value, setValue] = useState('');
  const initialTask = useSelector(selectorTask);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllTasks(initialData.tasks));
    dispatch(setAllBoards(initialData.boards));
    dispatch(setBoardOrder(initialData.boardOrder));
  }, []);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === 'board') {
      const newBoardOrder = Array.from(initialTask.boardsOrder);
      newBoardOrder.splice(source.index, 1);
      newBoardOrder.splice(destination.index, 0, draggableId);

      dispatch(setBoardOrder(newBoardOrder));
      return;
    }

    const start = initialTask.boards[source.droppableId];
    const finish = initialTask.boards[destination.droppableId];
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newBoard = {
        ...start,
        taskIds: newTaskIds,
      };

      dispatch(
        setAllBoards({
          [newBoard.id]: newBoard,
        }),
      );
      return;
    }

    //moving column
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    dispatch(
      setAllBoards({
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }),
    );
  };

  const handleAddNewBoard = async () => {
    const id = makeId();
    const newBoard = {
      [`board-${id}`]: {
        id: `board-${id}`,
        title: value,
        taskIds: [],
      },
    };
    if (value) {
      await dispatch(
        setAllBoards({
          ...newBoard,
        }),
      );
      await dispatch(
        setBoardOrder([...initialTask.boardsOrder, `board-${id}`]),
      );
    }
  };

  const handleChangeValue = useCallback(
    _.debounce(e => setValue(e.target.value), 300),
    [],
  );

  const BoardRender = React.memo(function BoardRender({ initialTask }) {
    return (
      <>
        {initialTask.boardsOrder.map((boardId, index) => {
          const board = initialTask.boards[boardId];
          const tasks = board.taskIds.map(taskId => initialTask.tasks[taskId]);
          return (
            <Board key={board.id} board={board} tasks={tasks} index={index} />
          );
        })}
      </>
    );
  });

  return (
    <Styled.Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId='all-columns'
          direction='horizontal'
          type='board'
        >
          {provided => (
            <Styled.Container
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <BoardRender initialTask={initialTask} />
              {provided.placeholder}
            </Styled.Container>
          )}
        </Droppable>
      </DragDropContext>
      <AddNewTask
        placeholder={'Add New Board'}
        handleAddNew={handleAddNewBoard}
        handleChangeValue={handleChangeValue}
      />
    </Styled.Container>
  );
}
