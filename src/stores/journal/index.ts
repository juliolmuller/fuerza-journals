import { create as createStore } from 'zustand';

import actions from './journal.actions';
import initialState from './journal.state';
import { JournalStore } from './journal.types';

const useJournalStore = createStore<JournalStore>((set, get) => ({
  ...initialState,
  ...actions(set, get),
}));

export default useJournalStore;
