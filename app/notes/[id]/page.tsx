import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetailsClient';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetails({ params }: Props) {
  const { id } = await params;
  console.log('note id:', id);
  const note = await fetchNoteById(id);
  console.log(note);

  return (
    <>
      <NoteDetailsClient item={note} />
    </>
  );
}
