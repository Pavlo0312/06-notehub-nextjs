export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string; // ISO date
}

export type CreateNotePayload = {
  title: string;
  content: string;
  tag: NoteTag;
};

export type NewNoteAddData = CreateNotePayload;

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NotesQuery {
  page?: number;
  perPage?: number;
  search?: string;
}
