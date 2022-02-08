import { JournalState } from './journal.types';

const journalStoreState: JournalState = {
  isFetching: false,
  isSaving: false,
  journals: [],
};

export default journalStoreState;
