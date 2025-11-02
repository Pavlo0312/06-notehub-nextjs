// app/notes/page.tsx
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const perPage = 12;
  const page = 1;
  const search = "";

  await queryClient.prefetchQuery({
    queryKey: ["notes", perPage, page, search],
    queryFn: () => fetchNotes(page, perPage, search),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
