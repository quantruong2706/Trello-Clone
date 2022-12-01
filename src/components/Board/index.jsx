import React, { Fragment, useState, useCallback } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import Task from '@components/Task';
import AddNewTask from '@components/AddNewTask';
import EditDialog from '@components/EditDialog';
import { setAllTasks, setAllBoards, setBoardOrder } from '@/reducers/task';
import { makeId } from '@/utils/helper';
import * as Styled from './styled';

function Board({ board, tasks, index }) {
  const [value, setValue] = useState('');
  const [editTask, setEditTask] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const handleAddNewTask = async (id, tasks, board) => {
    const idTask = makeId();
    const data = {
      [`task-${idTask}`]: {
        id: `task-${idTask}`,
        content: value,
      },
    };
    const newBoard = {
      ...board,
      taskIds: [...board.taskIds, `task-${idTask}`],
    };
    if (value && id) {
      await dispatch(setAllTasks(data));
      await dispatch(
        setAllBoards({
          [board.id]: newBoard,
        }),
      );
    }
  };

  const handleChangeValue = useCallback(
    _.debounce(e => setValue(e.target.value), 300),
    [],
  );

  const handleClickOpen = task => {
    setOpenDialog(true);
    setEditTask(task);
  };

  const RenderTask = React.memo(function RenderTask() {
    return (
      <>
        {tasks.map((task, index) => (
          <Fragment key={task.id}>
            <Task
              task={task}
              index={index}
              handleClickOpen={() => handleClickOpen(task)}
            />
            <EditDialog
              open={openDialog}
              data={editTask}
              setOpenDialog={() => setOpenDialog()}
            />
          </Fragment>
        ))}
      </>
    );
  });

  return (
    <Draggable draggableId={board.id} index={index}>
      {provided => (
        <Styled.Container {...provided.draggableProps} ref={provided.innerRef}>
          <Styled.Title {...provided.dragHandleProps}>
            {board.title}
          </Styled.Title>
          <AddNewTask
            placeholder={'Add New Task'}
            handleAddNew={() => handleAddNewTask(board.id, tasks, board)}
            handleChangeValue={handleChangeValue}
          />
          <Droppable droppableId={board.id} index={index} type='task'>
            {(provided, snapshot) => (
              <Styled.TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <RenderTask />
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
