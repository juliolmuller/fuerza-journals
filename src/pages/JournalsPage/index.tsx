import { useAuth } from '../../hooks';

function JournalsPage() {
  const { signOut } = useAuth();

  return (
    <>
      <h1>JournalsPage</h1>
      <button type="button" onClick={signOut}>
        Sign Out
      </button>
    </>
  );
}

export default JournalsPage;
