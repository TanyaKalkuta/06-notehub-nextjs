import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetailsClient';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetails({ params }: Props) {
  const { id } = await params;
  console.log('note id:', id);
  const queryClient = new QueryClient();

  // 1. Отримуємо note
  const note = await fetchNoteById(id);

  // 2. Префетч для кешу (не заміняє отримання note!)
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  // 2. Префетч для кешу (не заміняє отримання note!)
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient item={note} />
    </HydrationBoundary>
  );
}
