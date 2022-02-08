import {Journal} from '../../interfaces'

export interface JournalState {
  isFetching: boolean;
  isSaving: boolean;
  journals: Journal[];
}

export interface JournalActions {
  fetch: () => Promise<void>;
  create: (title: string) => Promise<void>;
  update: (id: string, title: string) => Promise<void>;
  addEntry: (journalId: string, title: string, content: string) => Promise<void>;
  updateEntry: (noteId: string, title: string, content: string) => Promise<void>;
}

export type JournalStore = JournalState & JournalActions;
