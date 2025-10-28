import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage() {
  const data = await fetchNotes(1, 12, "");

  return <NotesClient initialNotes={data} />;
}
