import { createSelector } from 'reselect';

// counter selector
const selectCounter = state => state.counter.value;
export const selectorCounter = createSelector(selectCounter, state => state);

// task selector
const selectTask = state => state.task
export const selectorTask = createSelector(selectTask, state => state);
