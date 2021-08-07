import { Journal, Note } from '../../contexts';
import Header from '../../components/TheHeader';
import Button from '../../components/Button';
import { useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useJournals } from '../../hooks';
import './styles.scss';

type NoteFormPageParams = {
  journalId: string;
  noteId: string;
};

function NoteFormPage() {
  const router = useHistory();
  const { journalId, noteId } = useParams<NoteFormPageParams>();
  const { isLoading, journals, createNote, updateNote } = useJournals();
  const [journal, setJournal] = useState<Journal>();
  const [note, setNote] = useState<Note>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (note) {
      await updateNote(noteId, title, content);
    } else {
      await createNote(journalId, title, content);
    }
    router.replace(`/journals/${journalId}/notes`);
  }

  // Get journal data or fallback to index page
  useEffect(() => {
    if (!isLoading) {
      const journal = journals.find((j) => j.id === journalId);
      const note = journal?.notes.find((e) => e.id === noteId);

      if (!journal) {
        console.info('Journal does note does not exist')
        router.replace(`/journals/${journalId}/notes`);
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
          <span onClick={() => router.goBack()}>&lt;</span>
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
