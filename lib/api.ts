import axios from "axios";
import type { Note, CreateNotePayload } from "@/types/note";

export interface NoteType {
  notes: Note[];
  totalPages: number;
}

const BASE = "https://notehub-public.goit.study/api";
const AUTH = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN ?? ""}`;

export async function fetchNotes(
  page: number,
  perPage: number,
  query: string,
): Promise<NoteType> {
  const params: Record<string, string> = {
    page: String(page),
    perPage: String(perPage),
  };
  if (query.trim()) params.search = query.trim();

  const { data } = await axios.get<NoteType>(`${BASE}/notes`, {
    params,
    headers: { Authorization: AUTH },
  });

  return data;
}

export async function fetchNoteById(id: string | number): Promise<Note> {
  const nid = Number(id);
  const { data } = await axios.get<Note>(`${BASE}/notes/${nid}`, {
    headers: { Authorization: AUTH },
  });
  return data;
}

export async function addNote(payload: CreateNotePayload): Promise<Note> {
  const { title, content, tag } = payload;
  const { data } = await axios.post<Note>(
    `${BASE}/notes`,
    { title, content, tag },
    { headers: { Authorization: AUTH } },
  );
  return data;
}

export async function deleteNote(id: string | number): Promise<Note> {
  const nid = Number(id);
  const { data } = await axios.delete<Note>(`${BASE}/notes/${nid}`, {
    headers: { Authorization: AUTH },
  });
  return data;
}
