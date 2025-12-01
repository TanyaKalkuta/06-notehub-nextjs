'use client';
import { Note } from '@/types/note';
import css from './NoteDetails.module.css';

type Props = {
  item: Note;
};

export default function NoteDetailsClient({ item }: Props) {
  const formattedDate = item.updatedAt
    ? `Updated at: ${item.updatedAt}`
    : `Created at: ${item.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{item.title}</h2>
        </div>
        <p className={css.content}>{item.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
}
