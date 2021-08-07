import { createContext, FC, useEffect, useState } from 'react';
import { useAuth } from '../hooks';
import http from '../services/api';

export type Note = {
  id: string;
  title: string;
  content: string;
};

export type Journal = {
  id: string;
  title: string;
  notes: Note[];
};

type JournalsContextProps = {
  journals: Journal[];
  isLoading: boolean;
  createJournal: (title: string) => Promise<void>;
  updateJournal: (id: string, title: string) => Promise<void>;
  createNote: (journalId: string, title: string, content: string) => Promise<void>;
  updateNote: (noteId: string, title: string, content: string) => Promise<void>;
};

export const JournalsContext = createContext({} as JournalsContextProps);

export const JournalsProvider: FC = ({ children }) => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { user } = useAuth();

  async function fetchJournals() {
    setLoading(true);
    const { journals }: Record<'journals', Journal[]> = await http.get(`/journals/${user?.id}`);
    const entriesSet: Record<'entries', Note[]>[] = await Promise.all(
      journals.map((journal): Promise<Record<'entries', Note[]>> => {
        return http.get(`/journals/entries/${journal.id}`);
      }),
    );

    journals.forEach((_, index) => {
      journals[index].notes = entriesSet[index].entries;
    });

    setJournals(journals);
    setLoading(false);
  }

  async function createJournal(title: string) {
    setLoading(true);
    const data = { title, userId: user?.id };

    await http.post('/journals', data);
    await fetchJournals();
  }

  async function updateJournal(id: string, title: string) {
    setLoading(true);
    const data = { title, userId: user?.id };

    await http.put(`/journals/${id}`, data);
    await fetchJournals();
  }

  async function createNote(journalId: string, title: string, content: string) {
    setLoading(true);
    const data = { title, content };
    console.log(data)
    await http.post(`/journals/entry/${journalId}`, data);
    await fetchJournals();
  }

  async function updateNote(noteId: string, title: string, content: string) {
    setLoading(true);
    const data = { title, content };

    await http.put(`/journals/entry/${noteId}`, data);
    await fetchJournals();
  }

  useEffect(() => {
    if (user?.id) {
      fetchJournals();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <JournalsContext.Provider
      value={{
        journals,
        isLoading,
        createJournal,
        updateJournal,
        createNote,
        updateNote,
      }}
    >
      {children}
    </JournalsContext.Provider>
  );
};
