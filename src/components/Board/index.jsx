import React, { Fragment, useState, useCallback, useRef } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'
import Task from '@components/Task'
import AddNewTask from '@components/AddNewTask'
import EditDialog from '@components/EditDialog'
import { makeId } from '@/utils/helper'
import { doc, setDoc, arrayUnion, updateDoc, arrayRemove, deleteDoc } from 'firebase/firestore'
import { selectorTask } from '@/selectors'
import db from '@server/firebase'
import * as Styled from './styled'

function Board({ board, tasks, index }) {
  const [editTask, setEditTask] = useState({})
  const [openDialog, setOpenDialog] = useState(false)
  const editTaskRef = useRef('')
  const newBoardRef = useRef('')

  const { boardsOrder } = useSelector(selectorTask)

  const handleOpenDialog = task => {
    setEditTask(task)
    setOpenDialog(true)
  }

  const handleAddNewTask = useCallback(async id => {
    const valueAdd = newBoardRef.current.value
    if (valueAdd && id) {
      const idTask = makeId()
      await setDoc(doc(db, 'tasks', `task-${idTask}`), {
        id: `task-${idTask}`,
        content: valueAdd
      })
      await updateDoc(doc(db, 'boards', id), {
        taskIds: arrayUnion(`task-${idTask}`)
      })
    }
  }, [])

  const handleDeleteBoard = useCallback(
    async boardId => {
      const newBoardIds = boardsOrder.filter(id => boardId !== id)
      const boardOrderRef = doc(db, 'boardOrders', 'boardOrder')
      await setDoc(
        boardOrderRef,
        {
          boardIds: newBoardIds
        },
        { merge: true }
      )
    },
    [boardsOrder]
  )

  const handleEditTask = useCallback(async id => {
    const valueEdit = editTaskRef.current.value
    console.log(valueEdit)
    if (valueEdit && id) {
      const newValue = {
        content: valueEdit
      }
      const taskRef = doc(db, 'tasks', id)
      await updateDoc(taskRef, newValue)
    }
    setOpenDialog(false)
  }, [])

  const handleDeleteTask = useCallback(
    async id => {
      if (id) {
        const boardRef = doc(db, 'boards', board.id)
        await updateDoc(boardRef, {
          taskIds: arrayRemove(id)
        })
        await deleteDoc(doc(db, 'tasks', id))
      }
    },
    [board.id]
  )

  return (
    <Draggable draggableId={board?.id} index={index}>
      {provided => (
        <Styled.Container {...provided.draggableProps} ref={provided.innerRef}>
          <Styled.Container>
            <Styled.Title {...provided.dragHandleProps}>
              <p>{board?.title}</p>
              <Styled.Delete onClick={() => handleDeleteBoard(board?.id)}>Delete</Styled.Delete>
            </Styled.Title>
          </Styled.Container>
          <AddNewTask
            newBoardRef={newBoardRef}
            placeholder={'Add New Task'}
            handleAddNew={() => handleAddNewTask(board.id)}
          />
          <Droppable droppableId={board?.id} index={index} type="task">
            {(provided, snapshot) => (
              <Styled.TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks?.map((task, index) => (
                  <Fragment key={task?.id}>
                    <Task task={task} index={index} handleClickOpen={() => handleOpenDialog(task)} />
                  </Fragment>
                ))}
                {provided.placeholder}
              </Styled.TaskList>
            )}
          </Droppable>
          <EditDialog
            editTaskRef={editTaskRef}
            open={openDialog}
            data={editTask?.content}
            handleEditTask={() => handleEditTask(editTask?.id)}
            handleDeleteTask={() => handleDeleteTask(editTask?.id)}
          />
        </Styled.Container>
      )}
    </Draggable>
  )
}

export default Board
