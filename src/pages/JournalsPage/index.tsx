import { Link, useNavigate } from 'react-router-dom';

import mascot from '~/assets/images/mascot.png';
import Header from '~/components/TheHeader';
import { useJournal } from '~/stores';
import './styles.scss';

function JournalsPage() {
  const navigate = useNavigate();
  const isLoading = useJournal((state) => state.isFetching);
  const journals = useJournal((state) => state.journals);

  function handleItemNavigation(journalId: string) {
    setTimeout(() => {
      // finish click animation before navigating
      navigate(`/journals/${journalId}/entries`);
    }, 400);
  }

  return (
    <div id="journals-page">
      <Header>
        {isLoading || !journals.length ? undefined : (
          <Link to="/journals/new" className="new-journal-btn">
            + Add journal
          </Link>
        )}
      </Header>

      <main>
        {isLoading || !journals.length ? (
          <div className="empty">
            <img src={mascot} alt="app mascot" />
            <Link to="/journals/new">Create a journal</Link>
          </div>
        ) : (
          <ul className="journals-deck">
            {journals.map((journal) => (
              <li key={journal.id} onClick={() => journal.id && handleItemNavigation(journal.id)}>
                {journal.title}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default JournalsPage;
