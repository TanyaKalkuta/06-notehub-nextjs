import { Note } from '@/types/note';
import css from './NoteDetails.module.css';

type Props = {
  item: Note;
};

export default function NoteDetailsClient({ item }: Props) {
  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{item.title}</h2>
        </div>
        <p className={css.content}>{item.content}</p>
        <p className={css.date}>{item.createdAt}</p>
      </div>
    </div>
  );
}
