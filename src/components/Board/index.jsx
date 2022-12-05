import React, { Fragment, useState, useCallback } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import Task from '@components/Task';
import AddNewTask from '@components/AddNewTask';
import EditDialog from '@components/EditDialog';
import { setAllTasks, setAllBoards, setBoardOrder } from '@/reducers/task';
import { makeId } from '@/utils/helper';
import { doc, setDoc, arrayUnion, updateDoc } from 'firebase/firestore';
import db from '@server/firebase';
import * as Styled from './styled';

function Board({ board, tasks, index }) {
  const [value, setValue] = useState('');
  const [editTask, setEditTask] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const handleAddNewTask = useCallback(async (id, tasks, board) => {
    const idTask = makeId();
    await updateDoc(doc(db, 'boards', board.id), {
      taskIds: arrayUnion(`task-${idTask}`),
    });
    await setDoc(doc(db, 'tasks', `task-${idTask}`), {
      id: `task-${idTask}`,
      content: value,
    });
  });

  const handleChangeValue = useCallback(
    _.debounce(e => setValue(e.target.value), 300),
    [],
  );

  const handleClickOpen = task => {
    setOpenDialog(true);
    setEditTask(task);
  };

  const RenderTask = React.memo(function RenderTask({
    key,
    task,
    index,
    boardId,
  }) {
    return (
      <Fragment key={key}>
        <Task
          task={task}
          index={index}
          handleClickOpen={() => handleClickOpen(task)}
        />
        <EditDialog
          open={openDialog || false}
          data={editTask}
          boardId={boardId}
          setOpenDialog={() => setOpenDialog()}
        />
      </Fragment>
    );
  });

  return (
    <Draggable draggableId={board?.id} index={index}>
      {provided => (
        <Styled.Container {...provided.draggableProps} ref={provided.innerRef}>
          <Styled.Title {...provided.dragHandleProps}>
            {board?.title}
          </Styled.Title>
          <AddNewTask
            placeholder={'Add New Task'}
            handleAddNew={() => handleAddNewTask(board?.id, tasks, board)}
            handleChangeValue={handleChangeValue}
          />
          <Droppable droppableId={board?.id} index={index} type='task'>
            {(provided, snapshot) => (
              <Styled.TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks?.map((task, index) => (
                  <RenderTask
                    key={task?.id}
                    task={task}
                    index={index}
                    boardId={board?.id}
                  />
                ))}
                {provided.placeholder}
              </Styled.TaskList>
            )}
          </Droppable>
        </Styled.Container>
      )}
    </Draggable>
  );
}

export default Board;
