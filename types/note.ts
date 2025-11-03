export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string; // має бути string
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string; // додано
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export type NewNoteAddData = CreateNotePayload;
