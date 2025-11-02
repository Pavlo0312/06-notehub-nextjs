// lib/api.ts
import axios from "axios";
import type { Note, NewNoteAddData } from "@/types/note";

const BASE = "https://notehub-public.goit.study/api";
const AUTH = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN ?? ""}`;

export type NotesResponse = { notes: Note[]; totalPages: number };

export async function fetchNotes(opts: {
  page?: number;
  perPage?: number;
  search?: string;
}): Promise<NotesResponse> {
  const { page = 1, perPage = 12, search = "" } = opts ?? {};
  const params: Record<string, string> = {
    page: String(page),
    perPage: String(perPage),
  };
  if (search.trim()) params.search = search.trim();

  const { data } = await axios.get<NotesResponse>(`${BASE}/notes`, {
    params,
    headers: { Authorization: AUTH },
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get<Note>(`${BASE}/notes/${id}`, {
    headers: { Authorization: AUTH },
  });
  return data;
}

export async function addNote(payload: NewNoteAddData): Promise<Note> {
  const { data } = await axios.post<Note>(`${BASE}/notes`, payload, {
    headers: { Authorization: AUTH },
  });
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await axios.delete<Note>(`${BASE}/notes/${id}`, {
    headers: { Authorization: AUTH },
  });
  return data;
}
