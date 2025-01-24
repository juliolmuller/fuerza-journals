import createStore from 'zustand';
import { devtools } from 'zustand/middleware';

import actions from './journal.actions';
import initialState from './journal.state';
import { JournalStore } from './journal.types';

const useJournalStore = createStore<JournalStore>(
  devtools(
    (set, get) => ({
      ...initialState,
      ...actions(set, get),
    }),
    { name: 'auth' },
  ),
);

export default useJournalStore;
