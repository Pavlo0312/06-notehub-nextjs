// app/notes/[id]/NoteDetails.client.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p className={css.tag}>{data.tag}</p>
      <p className={css.date}>{new Date(data.createdAt).toLocaleString()}</p>
    </div>
  );
}
