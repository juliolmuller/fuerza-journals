import { FormEvent, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import cover from '~/assets/images/cover.png';
import Button from '~/components/Button';
import Header from '~/components/TheHeader';
import { useJournal } from '~/stores';
import './styles.scss';

type JournalFormPageProps = {
  journalId: string;
};

function JournalFormPage() {
  const navigate = useNavigate();
  const { journalId } = useParams<JournalFormPageProps>();
  const isLoading = useJournal((state) => state.isSaving);
  const journals = useJournal((state) => state.journals);
  const createJournal = useJournal((state) => state.create);
  const updateJournal = useJournal((state) => state.update);
  const journal = useMemo(() => journals.find((j) => j.id === journalId), [journalId]); // eslint-disable-line react-hooks/exhaustive-deps
  const [title, setTitle] = useState(journal?.title || '');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (journal?.id) {
      await updateJournal(journal.id, title);
    } else {
      await createJournal(title);
    }
    navigate('/journals', { replace: true });
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
