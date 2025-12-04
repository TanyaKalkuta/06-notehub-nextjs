'use client';
import { useState } from 'react';
import css from './NotesPage.module.css';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import fetchNotes from '@/lib/api';

function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [debounceValue] = useDebounce(search, 1000);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data } = useQuery({
    queryKey: ['notes', debounceValue, page],
    queryFn: () => fetchNotes(debounceValue, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  //   useEffect(() => {
  //     if (isSuccess && debounceValue.trim() !== '' && data?.notes.length === 0) {
  //       toast.error('No notes found for your request.');
  //     }
  //   }, [isSuccess, data, debounceValue]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {
          <SearchBox
            onChange={value => {
              setSearch(value);
              setPage(1);
            }}
          />
        }

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {data && <NoteList notes={data.notes} />}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <NoteForm onClose={closeModal} />
      </Modal>
    </div>
  );
}

export default NotesClient;
