"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./Notes.module.css";

type NoteType = { notes: Note[]; totalPages: number };

export default function NotesClient() {
  const [currentPage, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const perPage = 12;
  const [debouncedSearch] = useDebounce(searchText, 300);

  const { data, isLoading, isSuccess, error } = useQuery<NoteType>({
    queryKey: ["notes", perPage, currentPage, debouncedSearch],
    queryFn: () => fetchNotes(currentPage, perPage, debouncedSearch),
    placeholderData: keepPreviousData,
    // ↓ менше повторних запитів (рейт-ліміт 429)
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        {/* Search */}
        <input
          className={css.search}
          value={searchText}
          placeholder="Search notes"
          onChange={(e) => {
            setPage(1);
            setSearchText(e.target.value);
          }}
        />
        {isSuccess && totalPages > 1 && (
          <Pagination total={totalPages} current={currentPage} onChange={setPage} />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      {isLoading && <p>Loading…</p>}
      {error && <p>Failed to load.</p>}
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
