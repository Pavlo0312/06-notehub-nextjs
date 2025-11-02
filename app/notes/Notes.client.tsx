"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import css from "./Notes.module.css";

function NotesClient() {
  const [currentPage, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const perPage = 12;
  const [debouncedSearchText] = useDebounce(searchText, 300);

  const { data, isSuccess, isLoading, error } = useQuery({
    queryKey: ["notes", perPage, currentPage, debouncedSearchText],
    queryFn: () => fetchNotes(currentPage, perPage, debouncedSearchText),
    placeholderData: keepPreviousData,
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          value={searchText}
          onSearch={(v) => {
            setPage(1);
            setSearchText(v);
          }}
        />
        {isSuccess && totalPages > 1 && (
          <Pagination
            total={totalPages}
            onChange={setPage}
            current={currentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      {isLoading && <p>Loading…</p>}
      {error && <p>Error: {(error as Error).message}</p>}
      {isSuccess && notes.length === 0 && <p>No notes</p>}
      {isSuccess && notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}

export default NotesClient;
