import { FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cover from '../../assets/images/cover.png';
import Header from '../../components/TheHeader';
import Button from '../../components/Button';
import { useJournals } from '../../hooks';
import './styles.scss';

type JournalFormPageProps = {
  journalId: string;
};

function JournalFormPage() {
  const navigate = useNavigate();
  const { journalId } = useParams<JournalFormPageProps>();
  const { isLoading, journals, createJournal, updateJournal } = useJournals();
  const journal = journalId ? journals.find((j) => j.id === journalId) : null;
  const [title, setTitle] = useState(journal?.title || '');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (journal) {
      await updateJournal(journal.id, title);
    } else {
      await createJournal(title);
    }
    navigate('/journals', {replace: true});
  }

  return (
    <div id="journal-form-page">
      <Header />

      <main>
        <div className="cover">
          <img src={cover} alt="book illustration" />
          <span>{title}</span>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            autoFocus
          />
          <Button type="submit" disabled={isLoading || !title}>
            Save journal
          </Button>
        </form>
      </main>
    </div>
  );
}

export default JournalFormPage;
