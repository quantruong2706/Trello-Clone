import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '@/reducers/counter';
import { selectorCounter } from '@/selectors';

export function Home() {
  const count = useSelector(selectorCounter);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
