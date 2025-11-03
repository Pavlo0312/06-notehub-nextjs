"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

export default function NoteDetailsClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading…</p>;
  if (isError || !data) return <p>Something went wrong</p>;

  return (
    <article>
      <h2>{data.title}</h2>
      <p>
        <b>Tag:</b> {data.tag}
      </p>
      {data.content && <p>{data.content}</p>}
      <small>Created: {new Date(data.createdAt).toLocaleString()}</small>
      <br />
      <small>Updated: {new Date(data.updatedAt).toLocaleString()}</small>
    </article>
  );
}
