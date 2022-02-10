import { GetState, SetState } from 'zustand';
import { Journal, Entry } from '../../interfaces';
import http from '../../services/api';
import {useAuth} from '..'
import { JournalActions, JournalStore } from './journal.types';

const journalStoreActions = (
  set: SetState<JournalStore>,
  get: GetState<JournalStore>,
): JournalActions => {
  async function fetch() {
    try {
      set({ isFetching: true });
      const user = useAuth.getState().user
      const { journals }: Record<'journals', Journal[]> = await http.get(`/journals/${user?.id}`);
      const entriesSet: Record<'entries', Entry[]>[] = await Promise.all(
        journals.map((journal): Promise<Record<'entries', Entry[]>> => {
          return http.get(`/journals/entries/${journal.id}`);
        }),
      );

      journals.forEach((_, index) => {
        journals[index].entries = entriesSet[index].entries;
      });

      set({ journals });
    } finally {
      set({ isFetching: false });
    }
  }

  async function create(title: string) {
    try {
      set({ isSaving: true });
      const user = useAuth.getState().user
      const data = { title, userId: user?.id };

      await http.post('/journals', data);
      await get().fetch();
    } finally {
      set({ isSaving: false });
    }
  }

  async function update(id: string, title: string) {
    try {
      set({ isSaving: true });
      const user = useAuth.getState().user
      const data = { title, userId: user?.id };

      await http.put(`/journals/${id}`, data);
      await get().fetch();
    } finally {
      set({ isSaving: false });
    }
  }

  async function addEntry(journalId: string, title: string, content: string) {
    try {
      set({ isSaving: true });
      const data = { title, content };

      await http.post(`/journals/entry/${journalId}`, data);
      await get().fetch();
    } finally {
      set({ isSaving: false });
    }
  }

  async function updateEntry(entryId: string, title: string, content: string) {
    try {
      set({ isSaving: true });
      const data = { title, content };

      await http.put(`/journals/entry/${entryId}`, data);
      await get().fetch();
    } finally {
      set({ isSaving: false });
    }
  }

  return {
    fetch,
    create,
    update,
    addEntry,
    updateEntry,
  };
};

export default journalStoreActions;
