import { Link, useHistory, useParams } from 'react-router-dom';
import Header from '../../components/TheHeader';
import { useEffect, useState } from 'react';
import { useJournals } from '../../hooks';
import mascot from '../../assets/images/mascot.png';
import './styles.scss';

type NotesPageProps = {
  journalId: string;
};

function NotesPage() {
  const router = useHistory();
  const { journalId } = useParams<NotesPageProps>();
  const { isLoading, journals } = useJournals();
  const [journal, setJournal] = useState<typeof journals[0]>();
  const notes = journal?.notes ?? [];

  function handleItemNavigation(noteId: string) {
    setTimeout(() => { // finish click animation before navigating
      router.push(`/journals/${journalId}/notes/${noteId}`);
    }, 400);
  }

  // Get journal data or fallback to index page
  useEffect(() => {
    if (!isLoading) {
      const journal = journals.find((j) => j.id === journalId);

      journal ? setJournal(journal) : router.replace('/journals');
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="notes-page">
      <Header>{isLoading || !notes.length ? undefined : null}</Header>

      <main>
        {isLoading || !notes.length ? (
          <div className="empty">
            <h2>{journal?.title}</h2>
            <img src={mascot} alt="app mascot" />
            <Link to={`/journals/${journalId}/notes/new}`}>Create a note</Link>
          </div>
        ) : (
          <section>
            <header>
              <h2>
                <span onClick={() => router.push('/journals')}>&lt;</span>
                {journal?.title}
              </h2>
              <Link to={`/journals/${journalId}/notes/new`} className="new-note-btn">
                + Add note
              </Link>
            </header>

            <ul className="notes-deck">
              {notes.map((note) => (
                <li key={note.id} onClick={() => handleItemNavigation(note.id)}>
                  {note.title}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default NotesPage;
