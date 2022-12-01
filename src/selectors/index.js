import { createSelector } from 'reselect';

// task selector
const selectTask = state => state.task
export const selectorTask = createSelector(selectTask, state => state);
