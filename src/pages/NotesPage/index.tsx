import { Link } from 'react-router-dom';
import Header from '../../components/TheHeader';
import { useParams } from 'react-router-dom';
import mascot from '../../assets/images/mascot.png';

type NotesPageProps = {
  journalId: string;
};

function NotesPage() {
  const { journalId } = useParams<NotesPageProps>();
  console.log(journalId);

  return (
    <div id="notes-page">
      <Header />

      <main>
        <div className="empty">
          <img src={mascot} alt="app mascot" />
          <Link to="new">Create a journal</Link>
        </div>
      </main>
    </div>
  );
}

export default NotesPage;
