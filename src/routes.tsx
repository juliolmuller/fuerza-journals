import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import JournalFormPage from './pages/JournalFormPage';
import JournalsPage from './pages/JournalsPage';
import NoteFormPage from './pages/NoteFormPage';
import NotesPage from './pages/NotesPage';
import { useAuth } from './hooks';

function PublicRoutes() {
  return (
    <Switch>
      <Route path="/signin" component={SignInPage} />
      <Route path="/signup" component={SignUpPage} />

      {/* if no route matches, redirect to "/journals" */}
      <Redirect to="/signin" />
    </Switch>
  );
}

function AuthRoutes() {
  return (
    <Switch>
      <Route path="/journals" exact component={JournalsPage} />
      <Route path="/journals/new" exact component={JournalFormPage} />
      <Route path="/journals/:journalId" exact component={JournalFormPage} />
      <Route path="/journals/:journalId/notes" exact component={NotesPage} />
      <Route path="/journals/:journalId/notes/new" exact component={NoteFormPage} />
      <Route path="/journals/:journalId/notes/:noteId" exact component={NoteFormPage} />

      {/* if no route matches, redirect to "/journals" */}
      <Redirect to="/journals" />
    </Switch>
  );
}

function Routes() {
  const { isAuthenticated } = useAuth();

  return <BrowserRouter>{isAuthenticated ? <AuthRoutes /> : <PublicRoutes />}</BrowserRouter>;
}

export default Routes;
