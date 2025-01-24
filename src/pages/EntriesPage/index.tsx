import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import mascot from '../../assets/images/mascot.png';
import Header from '../../components/TheHeader';
import { Journal } from '../../interfaces';
import { useJournal } from '../../stores';
import './styles.scss';

type EntriesPageProps = {
  journalId: string;
};

function EntriesPage() {
  const navigate = useNavigate();
  const { journalId } = useParams<EntriesPageProps>();
  const isLoading = useJournal((state) => state.isFetching);
  const journals = useJournal((state) => state.journals);
  const [journal, setJournal] = useState<Journal>();
  const entries = journal?.entries ?? [];

  function handleItemNavigation(entryId: string) {
    setTimeout(() => {
      // finish click animation before navigating
      navigate(`/journals/${journalId}/entries/${entryId}`);
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
    <div id="entries-page">
      <Header>{isLoading || !entries.length ? undefined : null}</Header>

      <main>
        {isLoading || !entries.length ? (
          <div className="empty">
            <h2>{journal?.title}</h2>
            <img src={mascot} alt="app mascot" />
            <Link to={`/journals/${journalId}/entries/new`}>Create a note</Link>
          </div>
        ) : (
          <section>
            <header>
              <h2>
                <span onClick={() => navigate('/journals')}>&lt;</span>
                {journal?.title}
              </h2>
              <Link to={`/journals/${journalId}/entries/new`} className="new-entry-btn">
                + Add note
              </Link>
            </header>

            <ul className="entries-deck">
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
