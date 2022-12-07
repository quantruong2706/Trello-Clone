/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { selectorTask } from '@/selectors'
import { setAllTasks, setAllBoards, setBoardOrder, setOpenDialog, setTaskSelected } from '@/reducers/task'
import Board from '@components/Board'
import AddNew from '@/components/AddNew'
import EditDialog from '@components/EditDialog'
import { makeId } from '@/utils/helper'
import _ from 'lodash'
import {
  doc,
  setDoc,
  arrayUnion,
  collection,
  query,
  onSnapshot,
  updateDoc,
  deleteDoc,
  arrayRemove
} from 'firebase/firestore'
import db from '@server/firebase'

import * as Styled from './styled'

export function Home() {
  const addNewBoardRef = useRef('')
  const editTaskRef = useRef('')
  const dispatch = useDispatch()
  const { tasks, boards, boardsOrder, taskSelected, isDialogOpen } = useSelector(selectorTask)

  const fetchAllTask = () => {
    onSnapshot(query(collection(db, 'tasks')), res => {
      const data = res.docs.map(d => d.data())
      const tasks = {}
      data.forEach(element => {
        tasks[element.id] = element
      })
      dispatch(setAllTasks(tasks))
    })
  }

  const fetchAllBoard = () => {
    onSnapshot(query(collection(db, 'boards')), res => {
      const data = res.docs.map(d => d.data())
      const boards = {}
      data.forEach(element => {
        boards[element.id] = element
      })
      dispatch(setAllBoards(boards))
    })
  }

  const fetchBoardOrder = () => {
    onSnapshot(doc(db, 'boardOrders', 'boardOrder'), res => {
      dispatch(setBoardOrder(res.data()?.boardIds))
    })
  }

  useEffect(() => {
    fetchBoardOrder()
    fetchAllBoard()
    fetchAllTask()
  }, [])

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    if (type === 'board') {
      const newBoardOrder = Array.from(boardsOrder)
      newBoardOrder.splice(source.index, 1)
      newBoardOrder.splice(destination.index, 0, draggableId)
      const boardOrderRef = doc(db, 'boardOrders', 'boardOrder')
      setDoc(
        boardOrderRef,
        {
          boardIds: newBoardOrder
        },
        { merge: true }
      )
      return
    }
    // move task from position start - finish
    const startDrag = boards[source.droppableId]
    const finishDrag = boards[destination.droppableId]
    if (startDrag === finishDrag) {
      const newTaskIds = Array.from(startDrag.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)
      const boardStartRef = doc(db, 'boards', source.droppableId)
      setDoc(
        boardStartRef,
        {
          taskIds: newTaskIds
        },
        { merge: true }
      )
      return
    }
    //moving column from position start - finish
    const startTaskIds = Array.from(startDrag.taskIds)
    startTaskIds.splice(source.index, 1)

    const finishTaskIds = Array.from(finishDrag.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)

    const startTaskIdsRef = doc(db, 'boards', startDrag.id)
    const finishTaskIdsRef = doc(db, 'boards', finishDrag.id)
    setDoc(
      startTaskIdsRef,
      {
        taskIds: startTaskIds
      },
      { merge: true }
    )
    setDoc(
      finishTaskIdsRef,
      {
        taskIds: finishTaskIds
      },
      { merge: true }
    )
  }

  const handleAddNewBoard = useCallback(() => {
    const id = makeId()
    const value = addNewBoardRef.current.value
    if (value) {
      setDoc(
        doc(db, 'boards', `board-${id}`),
        {
          id: `board-${id}`,
          title: value,
          taskIds: []
        },
        { merge: true }
      )
      updateDoc(
        doc(db, 'boardOrders', 'boardOrder'),
        {
          boardIds: arrayUnion(`board-${id}`)
        },
        { merge: true }
      )
      addNewBoardRef.current.value = ''
    }
  }, [])

  const handleEditTask = useCallback(id => {
    const valueEdit = editTaskRef.current.value
    if (valueEdit && id) {
      const newValue = {
        content: valueEdit
      }
      updateDoc(doc(db, 'tasks', id), newValue)
      dispatch(setOpenDialog(false))
    }
  }, [])

  const handleDeleteTask = useCallback(
    id => {
      if (id) {
        updateDoc(doc(db, 'boards', taskSelected.boardId), {
          taskIds: arrayRemove(id)
        })
        deleteDoc(doc(db, 'tasks', id))
        dispatch(setOpenDialog(false))
      }
    },
    [taskSelected.boardId]
  )

  const handleDeleteBoard = useCallback(
    ({ boardId }) => {
      if (boardsOrder.length > 1) {
        const newBoardIds = boardsOrder.filter(id => boardId !== id)
        const boardOrderRef = doc(db, 'boardOrders', 'boardOrder')
        setDoc(
          boardOrderRef,
          {
            boardIds: newBoardIds
          },
          { merge: true }
        )
      }
    },
    [boardsOrder]
  )

  const handleOpenDialog = useCallback(({ task, boardId }) => {
    dispatch(setTaskSelected({ task, boardId }))
    dispatch(setOpenDialog(true))
  }, [])

  return (
    <>
      <Styled.Title>Base Project - Trello Clone with Firebase Integration</Styled.Title>
      <Styled.Container>
        {boardsOrder.length > 0 && !_.isEmpty(boards) && !_.isEmpty(tasks) ? (
          <Styled.Container>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="all-columns" direction="horizontal" type="board">
                {provided => (
                  <Styled.Container {...provided.droppableProps} ref={provided.innerRef}>
                    {boardsOrder?.map((boardId, index) => {
                      const board = boards[boardId]
                      const task = board?.taskIds.map(taskId => tasks[taskId])
                      return (
                        <Board
                          index={index}
                          key={boardId}
                          board={board}
                          tasks={task}
                          handleOpenDialog={handleOpenDialog}
                          handleDeleteBoard={handleDeleteBoard}
                        />
                      )
                    })}
                    {provided.placeholder}
                  </Styled.Container>
                )}
              </Droppable>
            </DragDropContext>
          </Styled.Container>
        ) : null}
        <AddNew addNewRef={addNewBoardRef} placeholder={'Add New Board'} handleAddNew={handleAddNewBoard} />
        <EditDialog
          editTaskRef={editTaskRef}
          open={isDialogOpen}
          data={taskSelected?.task?.content}
          handleEditTask={() => handleEditTask(taskSelected?.task?.id)}
          handleDeleteTask={() => handleDeleteTask(taskSelected?.task?.id)}
        />
      </Styled.Container>
    </>
  )
}
