import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks';

type NotesPageProps = {
  journalId: string;
};

function NotesPage() {
  const { signOut } = useAuth();
  const { journalId } = useParams<NotesPageProps>();

  return (
    <>
      <h1>NotesPage {journalId && <>(journal #{journalId})</>}</h1>
      <button type="button" onClick={signOut}>
        Sign Out
      </button>
    </>
  );
}

export default NotesPage;
