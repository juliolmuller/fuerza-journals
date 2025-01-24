import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../components/Button';
import Header from '../../components/TheHeader';
import { Journal } from '../../interfaces';
import { useJournal } from '../../stores';
import './styles.scss';

type EntryFormPageParams = {
  journalId: string;
  entryId: string;
};

function EntryFormPage() {
  const navigate = useNavigate();
  const { journalId, entryId } = useParams<EntryFormPageParams>();
  const isLoading = useJournal((state) => state.isSaving);
  const journals = useJournal((state) => state.journals);
  const createEntry = useJournal((state) => state.addEntry);
  const updateEntry = useJournal((state) => state.updateEntry);
  const [journal, setJournal] = useState<Journal>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (entryId) {
      await updateEntry(entryId, title, content);
    } else {
      await createEntry(journalId!, title, content);
    }
    navigate(`/journals/${journalId}/entries`, { replace: true });
  }

  // Get journal data or fallback to index page
  useEffect(() => {
    if (!isLoading) {
      const journal = journals.find((j) => j.id === journalId);
      const entry = journal?.entries?.find((e) => e.id === entryId);

      if (!journal) {
        console.info('Journal does not exist');
        navigate(`/journals/${journalId}/entries`, { replace: true });
      } else {
        setJournal(journal);

        if (entry) {
          setTitle(entry.title);
          setContent(entry.content);
        }
      }
    }
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="entry-form-page">
      <Header />

      <main>
        <h2>
          <span onClick={() => navigate(-1)}>&lt;</span>
          {journal?.title}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(event) => setTitle(event.target.value)}
            autoFocus
          />
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your note"
            rows={5}
          />
          <Button type="submit" disabled={isLoading || !title}>
            Save note
          </Button>
        </form>
      </main>
    </div>
  );
}

export default EntryFormPage;
