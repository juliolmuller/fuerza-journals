import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/TheHeader';
import Button from '../../components/Button';
import { Journal, Note } from '../../contexts';
import { useJournals } from '../../hooks';
import './styles.scss';

type NoteFormPageParams = {
  journalId: string;
  noteId: string;
};

function NoteFormPage() {
  const navigate = useNavigate();
  const { journalId, noteId } = useParams<NoteFormPageParams>();
  const { isLoading, journals, createNote, updateNote } = useJournals();
  const [journal, setJournal] = useState<Journal>();
  const [note, setNote] = useState<Note>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (note) {
      await updateNote(noteId!, title, content);
    } else {
      await createNote(journalId!, title, content);
    }
    navigate(`/journals/${journalId}/notes`, { replace: true });
  }

  // Get journal data or fallback to index page
  useEffect(() => {
    if (!isLoading) {
      const journal = journals.find((j) => j.id === journalId);
      const note = journal?.notes.find((e) => e.id === noteId);

      if (!journal) {
        console.info('Journal does note does not exist');
        navigate(`/journals/${journalId}/notes`, { replace: true });
      } else {
        setJournal(journal);

        if (note) {
          setNote(note);
          setTitle(note.title);
          setContent(note.content);
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
