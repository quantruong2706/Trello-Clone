/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { selectorTask } from '@/selectors'
import { setAllTasks, setAllBoards, setBoardOrder } from '@/reducers/task'
import Board from '@components/Board'
import AddNewTask from '@components/AddNewTask'
import { makeId } from '@/utils/helper'
import _ from 'lodash'
import { doc, setDoc, arrayUnion, collection, query, onSnapshot, updateDoc } from 'firebase/firestore'
import db from '@server/firebase'

import * as Styled from './styled'

export function Home() {
  const newBoardRef = useRef('')
  const dispatch = useDispatch()

  const fetchAllTask = () => {
    const q = query(collection(db, 'tasks'))
    onSnapshot(q, res => {
      const data = res.docs.map(d => d.data())
      const tasks = {}
      data.forEach(element => {
        tasks[element.id] = element
      })
      dispatch(setAllTasks(tasks))
    })
  }

  const fetchAllBoard = () => {
    const q = query(collection(db, 'boards'))
    onSnapshot(q, res => {
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

  const { tasks, boards, boardsOrder } = useSelector(selectorTask)

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
    const value = newBoardRef.current.value
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
    }
  }, [])

  const BoardRender = React.memo(function BoardRender() {
    return (
      <>
        {boardsOrder?.map((boardId, index) => {
          const board = boards[boardId]
          const task = board?.taskIds.map(taskId => tasks[taskId])
          return <Board key={boardId} board={board} tasks={task} index={index} />
        })}
      </>
    )
  })

  return (
    <>
      <Styled.Title>Base Project - Trello Clone with Firebase Integration</Styled.Title>
      {boardsOrder.length > 0 && !_.isEmpty(boards) && !_.isEmpty(tasks) ? (
        <Styled.Container>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="board">
              {provided => (
                <Styled.Container {...provided.droppableProps} ref={provided.innerRef}>
                  <BoardRender />
                  {provided.placeholder}
                </Styled.Container>
              )}
            </Droppable>
          </DragDropContext>
          <AddNewTask newBoardRef={newBoardRef} placeholder={'Add New Board'} handleAddNew={handleAddNewBoard} />
        </Styled.Container>
      ) : null}
    </>
  )
}
