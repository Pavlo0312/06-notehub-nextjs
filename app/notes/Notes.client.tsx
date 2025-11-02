// app/notes/Notes.client.tsx
"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useDebounce } from "use-debounce";
import css from "./Notes.module.css";

const PER_PAGE = 12;

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [debounced] = useDebounce(search, 300);

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["notes", { page, perPage: PER_PAGE, search: debounced }],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search: debounced }),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          value={search}
          onSearch={(val) => {
            setPage(1);
            setSearch(val);
          }}
        />
        {isSuccess && totalPages > 1 && (
          <Pagination total={totalPages} current={page} onChange={setPage} />
        )}
        <button className={css.button} onClick={() => setOpen(true)}>
          Create note +
        </button>
      </div>

      {isLoading && <p>Loading…</p>}
      {isError && <p>Error: {(error as Error).message}</p>}
      {isSuccess && notes.length === 0 && <p>No notes</p>}
      {isSuccess && notes.length > 0 && <NoteList notes={notes} />}

      {isOpen && (
        <Modal onClose={() => setOpen(false)}>
          <NoteForm onClose={() => setOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
