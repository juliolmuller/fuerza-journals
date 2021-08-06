import { useContext } from 'react';
import { JournalsContext } from '../contexts';

function useJournals() {
  return useContext(JournalsContext);
}

export default useJournals;
