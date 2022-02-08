import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/TheHeader';
import Button from '../../components/Button';
import { Journal } from '../../interfaces';
import { useJournal } from '../../stores';
import './styles.scss';

type NoteFormPageParams = {
  journalId: string;
  noteId: string;
};

function NoteFormPage() {
  const navigate = useNavigate();
  const { journalId, noteId } = useParams<NoteFormPageParams>();
  const isLoading = useJournal((state) => state.isSaving);
  const journals = useJournal((state) => state.journals);
  const createEntry = useJournal((state) => state.addEntry);
  const updateEntry = useJournal((state) => state.updateEntry);
  const [journal, setJournal] = useState<Journal>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (noteId) {
      await updateEntry(noteId, title, content);
    } else {
      await createEntry(journalId!, title, content);
    }
    navigate(`/journals/${journalId}/notes`, { replace: true });
  }

  // Get journal data or fallback to index page
  useEffect(() => {
    if (!isLoading) {
      const journal = journals.find((j) => j.id === journalId);
      const entry = journal?.entries?.find((e) => e.id === noteId);

      if (!journal) {
        console.info('Journal does note does not exist');
        navigate(`/journals/${journalId}/notes`, { replace: true });
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
    <div id="note-form-page">
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

export default NoteFormPage;
