import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffectOnce } from 'react-use';

import EntriesPage from '~/pages/EntriesPage';
import EntryFormPage from '~/pages/EntryFormPage';
import JournalFormPage from '~/pages/JournalFormPage';
import JournalsPage from '~/pages/JournalsPage';
import SignInPage from '~/pages/SignInPage';
import SignUpPage from '~/pages/SignUpPage';
import { useJournal } from '~/stores';

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* if no route matches, redirect to "/journals" */}
      <Route path="*" element={<Navigate replace to="/signin" />} />
    </Routes>
  );
}

export function AuthRoutes() {
  const fetchUserJournals = useJournal((state) => state.fetch);

  useEffectOnce(() => {
    fetchUserJournals();
  });

  return (
    <Routes>
      <Route path="/journals">
        <Route index element={<JournalsPage />} />
        <Route path="/journals/new" element={<JournalFormPage />} />
        <Route path="/journals/:journalId" element={<JournalFormPage />} />
        <Route path="/journals/:journalId/entries" element={<EntriesPage />} />
        <Route path="/journals/:journalId/entries/new" element={<EntryFormPage />} />
        <Route path="/journals/:journalId/entries/:entryId" element={<EntryFormPage />} />
      </Route>

      {/* if no route matches, redirect to "/journals" */}
      <Route path="*" element={<Navigate replace to="/journals" />} />
    </Routes>
  );
}
