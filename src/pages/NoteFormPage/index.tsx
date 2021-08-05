import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks';

type NoteFormPageParams = {
  journalId: string;
  noteId: string;
};

function NoteFormPage() {
  const { signOut } = useAuth();
  const { journalId, noteId } = useParams<NoteFormPageParams>();

  return (
    <>
      <h1>
        NoteFormPage
        {journalId && (
          <>
            (journal #{journalId}
            {noteId && <> - note #{noteId}</>})
          </>
        )}
      </h1>
      <button type="button" onClick={signOut}>
        Sign Out
      </button>
    </>
  );
}

export default NoteFormPage;
