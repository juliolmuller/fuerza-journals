import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks';

type JournalFormPageProps = {
  journalId: string;
};

function JournalFormPage() {
  const { signOut } = useAuth();
  const { journalId } = useParams<JournalFormPageProps>();

  return (
    <>
      <h1>JournalFormPage {journalId && <>(journal #{journalId})</>}</h1>
      <button type="button" onClick={signOut}>
        Sign Out
      </button>
    </>
  );
}

export default JournalFormPage;
