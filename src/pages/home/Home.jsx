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
import {
  doc,
  getDocs,
  setDoc,
  arrayUnion,
  collection,
  query,
  onSnapshot,
} from 'firebase/firestore';
import db from '@server/firebase';

import * as Styled from './styled';

export function Home() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const fetchAllTask = async () => {
    const q = query(collection(db, 'tasks'));
    const querySnapshot = await getDocs(q);
    onSnapshot(q, res => {
      const data = res.docs.map(d => d.data());
      const tasks = {};
      data.forEach(element => {
        tasks[element.id] = element;
      });
      dispatch(setAllTasks(tasks));
    });
  };

  const fetchAllBoard = async () => {
    const q = query(collection(db, 'boards'));
    const querySnapshot = await getDocs(q);
    onSnapshot(q, res => {
      const data = res.docs.map(d => d.data());
      const boards = {};
      data.forEach(element => {
        boards[element.id] = element;
      });
      dispatch(setAllBoards(boards));
    });
  };

  const fetchBoardOrder = async () => {
    const q = query(collection(db, 'boardOrder'));
    const querySnapshot = await getDocs(q);
    onSnapshot(q, res => {
      dispatch(setBoardOrder(res.docs.map(data => data.id)));
    });
  };

  useEffect(() => {
    fetchBoardOrder();
    fetchAllBoard();
    fetchAllTask();
  }, []);

  const { tasks, boards, boardsOrder, isLoading } = useSelector(selectorTask);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === 'board') {
      const newBoardOrder = Array.from(boardsOrder);
      newBoardOrder.splice(source.index, 1);
      newBoardOrder.splice(destination.index, 0, draggableId);

      dispatch(setBoardOrder(newBoardOrder));
      return;
    }

    // move task from position start - finish
    const startDrag = boards[source.droppableId];
    const finishDrag = boards[destination.droppableId];
    if (startDrag === finishDrag) {
      const newTaskIds = Array.from(startDrag.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newBoard = {
        ...startDrag,
        taskIds: newTaskIds,
      };

      dispatch(
        setAllBoards({
          [newBoard.id]: newBoard,
        }),
      );
      return;
    }

    //moving column from position start - finish
    const startTaskIds = Array.from(startDrag.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...startDrag,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishDrag.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishDrag,
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
      await dispatch(setBoardOrder([...boardsOrder, `board-${id}`]));
    }
  };

  const handleChangeValue = useCallback(
    _.debounce(e => setValue(e.target.value), 300),
    [],
  );
  const BoardRender = React.memo(function BoardRender() {
    return (
      <>
        {boardsOrder?.map((boardId, index) => {
          const board = boards[boardId];
          const task = board?.taskIds.map(taskId => tasks[taskId]);
          return (
            <>
              <Board
                key={board?.id}
                board={board}
                tasks={task}
                index={index}
              />
            </>
          );
        })}
      </>
    );
  });

  return (
    <>
      <Styled.Title>
        Base Project - Trello Clone with Firebase Integration
      </Styled.Title>
      {boardsOrder.length > 0 &&
      Object.entries(boards).length !== 0 &&
      Object.entries(tasks).length !== 0 ? (
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
                  <BoardRender />
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
      ) : null}
    </>
  );
}
