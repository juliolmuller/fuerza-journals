import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/TheHeader';
import { Journal } from '../../interfaces';
import { useJournal } from '../../stores';
import mascot from '../../assets/images/mascot.png';
import './styles.scss';

type NotesPageProps = {
  journalId: string;
};

function EntriesPage() {
  const navigate = useNavigate();
  const { journalId } = useParams<NotesPageProps>();
  const isLoading = useJournal((state) => state.isFetching);
  const journals = useJournal((state) => state.journals);
  const [journal, setJournal] = useState<Journal>();
  const entries = journal?.entries ?? [];

  function handleItemNavigation(noteId: string) {
    setTimeout(() => {
      // finish click animation before navigating
      navigate(`/journals/${journalId}/notes/${noteId}`);
    }, 400);
  }

  // Get journal data or fallback to index page
  useEffect(() => {
    if (!isLoading) {
      const journal = journals.find((j) => j.id === journalId);
      journal ? setJournal(journal) : navigate('/journals', { replace: true });
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="notes-page">
      <Header>{isLoading || !entries.length ? undefined : null}</Header>

      <main>
        {isLoading || !entries.length ? (
          <div className="empty">
            <h2>{journal?.title}</h2>
            <img src={mascot} alt="app mascot" />
            <Link to={`/journals/${journalId}/notes/new}`}>Create a note</Link>
          </div>
        ) : (
          <section>
            <header>
              <h2>
                <span onClick={() => navigate('/journals')}>&lt;</span>
                {journal?.title}
              </h2>
              <Link to={`/journals/${journalId}/notes/new`} className="new-note-btn">
                + Add note
              </Link>
            </header>

            <ul className="notes-deck">
              {entries.map((entry) => (
                <li key={entry.id} onClick={() => entry.id && handleItemNavigation(entry.id)}>
                  {entry.title}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default EntriesPage;
