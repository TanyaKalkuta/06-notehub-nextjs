'use client';
import { useEffect, useState } from 'react';
import css from './NotesPage.module.css';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { toast, Toaster } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import fetchNotes from '@/lib/api';

function Notes() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [debounceValue] = useDebounce(search, 1000);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, isFetching, isError, isSuccess } = useQuery({
    queryKey: ['notes', debounceValue, page],
    queryFn: () =>
      fetchNotes({
        page: page,
        perPage: 12,
        search: debounceValue,
      }),
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (isSuccess && debounceValue.trim() !== '' && data?.notes.length === 0) {
      toast.error('No notes found for your request.');
    }
  }, [isSuccess, data, debounceValue]);

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

        {isError && <ErrorMessage />}

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
      {isError && <p>Error loading notes</p>}
      {(isLoading || isFetching) && <Loader />}
      {data && <NoteList notes={data.notes} />}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <NoteForm onClose={closeModal} />
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default Notes;
