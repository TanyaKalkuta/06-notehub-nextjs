type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetails({ params }: Props) {
  const { id } = await params;
  console.log('note id:', id);

  return <div>NoteDetails</div>;
}
