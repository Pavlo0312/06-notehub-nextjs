import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage() {
  const currentPage = 1;
  const perPage = 12;
  const debouncedSearchText = "";
  const initialValues = await fetchNotes(
    currentPage,
    perPage,
    debouncedSearchText,
  );
  return (
    <>
      <NotesClient initialData={initialValues} />
    </>
  );
}
