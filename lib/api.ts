// lib/api.ts (єдиний варіант)
import axios from "axios";
import type { Note, NewNoteAddData } from "@/types/note";

const BASE = "https://notehub-public.goit.study/api";
const AUTH = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN ?? ""}`;

export type NoteType = { notes: Note[]; totalPages: number };

export async function fetchNotes(page: number, perPage: number, search: string) {
  const params: Record<string, string> = { page: String(page), perPage: String(perPage) };
  if (search.trim()) params.search = search.trim();

  const { data } = await axios.get<NoteType>(`${BASE}/notes`, {
    params,
    headers: { Authorization: AUTH },
  });
  return data;
}

export async function addNote(note: NewNoteAddData) {
  const { data } = await axios.post<Note>(`${BASE}/notes`, note, {
    headers: { Authorization: AUTH },
  });
  return data;
}

export async function deleteNote(noteId: string) {
  const { data } = await axios.delete<Note>(`${BASE}/notes/${noteId}`, {
    headers: { Authorization: AUTH },
  });
  return data;
}

export async function fetchNoteById(id: string) {
  const { data } = await axios.get<Note>(`${BASE}/notes/${id}`, {
    headers: { Authorization: AUTH },
  });
  return data;
}
