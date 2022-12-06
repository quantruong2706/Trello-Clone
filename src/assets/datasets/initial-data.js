const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Task 1' },
    'task-2': { id: 'task-2', content: 'Task 2' },
    'task-3': { id: 'task-3', content: 'Task 3' },
    'task-4': { id: 'task-4', content: 'Task 4' }
  },
  boards: {
    'board-1': {
      id: 'board-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2']
    },
    'board-2': {
      id: 'board-2',
      title: 'In progress',
      taskIds: ['task-3']
    },
    'board-3': {
      id: 'board-3',
      title: 'Done',
      taskIds: ['task-4']
    }
  },
  boardOrder: ['board-1', 'board-2', 'board-3']
}

export default initialData
