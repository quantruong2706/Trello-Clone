import { createSelector } from 'reselect';

// counter selector
const selectCounter = state => state.counter.value;
export const selectorCounter = createSelector(selectCounter, state => state);
