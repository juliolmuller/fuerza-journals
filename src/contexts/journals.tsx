import { createContext, FC, useEffect, useState } from 'react';
import { useAuth } from '../hooks';
import http from '../services/api';

type Journal = {
  id: string;
  title: string;
};

type JournalsContextProps = {
  journals: Journal[];
  isLoading: boolean;
  createJournal: (title: string) => Promise<void>;
  updateJournal: (id: string, title: string) => Promise<void>;
};

export const JournalsContext = createContext({} as JournalsContextProps);

export const JournalsProvider: FC = ({ children }) => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { user } = useAuth();

  async function fetchJournals() {
    setLoading(true);
    const response: { journals: Journal[] } = await http.get(`/journals/${user?.id}`);

    setJournals(response.journals);
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
      }}
    >
      {children}
    </JournalsContext.Provider>
  );
};
