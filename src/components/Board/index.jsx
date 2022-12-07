import React, { Fragment, useRef, useCallback } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import Task from '@components/Task'
import AddNew from '@/components/AddNew'
import { makeId } from '@/utils/helper'
import { doc, setDoc, arrayUnion, updateDoc } from 'firebase/firestore'
import db from '@server/firebase'
import * as Styled from './styled'

function Board({ handleDeleteBoard, handleOpenDialog, board, tasks, index }) {
  const addNewTaskRef = useRef('')

  const handleAddNewTask = useCallback(({ boardId }) => {
    const valueAdd = addNewTaskRef.current.value
    const id = makeId()
    if (valueAdd && boardId) {
      setDoc(doc(db, 'tasks', `task-${id}`), {
        id: `task-${id}`,
        content: valueAdd
      })
      updateDoc(doc(db, 'boards', boardId), {
        taskIds: arrayUnion(`task-${id}`)
      })
    }
  }, [])

  return (
    <Draggable draggableId={board?.id} index={index}>
      {provided => (
        <Styled.Container {...provided.draggableProps} ref={provided.innerRef}>
          <Styled.Container>
            <Styled.Title {...provided.dragHandleProps}>
              <p>{board?.title}</p>
              <Styled.Delete onClick={() => handleDeleteBoard({ boardId: board?.id })}>Delete</Styled.Delete>
            </Styled.Title>
          </Styled.Container>
          <AddNew
            addNewRef={addNewTaskRef}
            placeholder={'Add New Task'}
            handleAddNew={() => handleAddNewTask({ boardId: board?.id })}
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
                    <Task
                      task={task}
                      index={index}
                      handleClickOpen={() => handleOpenDialog({ task: task, boardId: board?.id })}
                    />
                  </Fragment>
                ))}
                {provided.placeholder}
              </Styled.TaskList>
            )}
          </Droppable>
        </Styled.Container>
      )}
    </Draggable>
  )
}

export default Board
