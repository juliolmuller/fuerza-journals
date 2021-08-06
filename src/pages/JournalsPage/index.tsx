import { Link } from 'react-router-dom';
import Header from '../../components/TheHeader';
import { useJournals } from '../../hooks';
import mascot from '../../assets/images/mascot.png';
import './styles.scss';

function JournalsPage() {
  const { isLoading, journals } = useJournals();

  return (
    <div id="journals-page">
      <Header />

      <main>
        {isLoading || !journals.length ? (
          <div className="empty">
            <img src={mascot} alt="app mascot" />
            <Link to="/journals/new">Create a journal</Link>
          </div>
        ) : (
          journals.map((journal) => (
            <Link to={`/journals/${journal.id}/notes`} key={journal.id} className="journal">
              {journal.title}
            </Link>
          ))
        )}
      </main>
    </div>
  );
}

export default JournalsPage;
