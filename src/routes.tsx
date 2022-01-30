import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import JournalFormPage from './pages/JournalFormPage';
import JournalsPage from './pages/JournalsPage';
import NoteFormPage from './pages/NoteFormPage';
import NotesPage from './pages/NotesPage';
import { useAuth } from './hooks';

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* if no route matches, redirect to "/journals" */}
      <Route path="*" element={<Navigate replace to="/signin" />} />
    </Routes>
  );
}

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/journals">
        <Route index element={<JournalsPage />} />
        <Route path="/journals/new" element={<JournalFormPage />} />
        <Route path="/journals/:journalId" element={<JournalFormPage />} />
        <Route path="/journals/:journalId/notes" element={<NotesPage />} />
        <Route path="/journals/:journalId/notes/new" element={<NoteFormPage />} />
        <Route path="/journals/:journalId/notes/:noteId" element={<NoteFormPage />} />
      </Route>

      {/* if no route matches, redirect to "/journals" */}
      <Route path="*" element={<Navigate replace to="/journals" />} />
    </Routes>
  );
}

function AppROutes() {
  const { isAuthenticated } = useAuth();

  return <BrowserRouter>{isAuthenticated ? <AuthRoutes /> : <PublicRoutes />}</BrowserRouter>;
}

export default AppROutes;
