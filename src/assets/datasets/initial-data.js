const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
  },
  boards: {
    'board-1': {
      id: 'board-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'board-2': {
      id: 'board-2',
      title: 'In progress',
      taskIds: [],
    },
    'board-3': {
      id: 'board-3',
      title: 'Done',
      taskIds: [],
    },
  },
  boardOrder: ['board-1', 'board-2', 'board-3'],
};

export default initialData;
