import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import * as Styled from './styled'

function Task({ task, index, handleClickOpen }) {
  return (
    <div onClick={handleClickOpen}>
      <Draggable draggableId={task?.id} index={index}>
        {provided => (
          <Styled.Container ref={provided.innerRef} {...provided.draggableProps}>
            <p {...provided.dragHandleProps}>{task?.content}</p>
          </Styled.Container>
        )}
      </Draggable>
    </div>
  )
}

export default Task
