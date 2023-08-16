import { isNotNil } from "ramda";
import queryClient from "@/utils/query-client";
import type { CacheQuery } from "@/types";

/**
 * Serve the api call from cache if entity exists, redirect to the backend server otherwise.
 * @param {function} queryGetter returns a react-query applicable query object
 * @param {string} entityId it is used only for requesting specific entities (with ids) from the server
 * @returns data fetched from API or cache
 * @info it has two signatures:
 * getOrFetch(queryGetter);
 * getOrFetch(queryGetterById, id);
 */

export default async function getOrFetch<T>(
  queryGetter: () => CacheQuery<T>,
): Promise<T | null> {
  const query = queryGetter();

  let entity = null;

  const cachedData = queryClient.getQueryData(query.queryKey);

  if (isNotNil(cachedData)) {
    entity = cachedData;
  } else {
    try {
      entity = await queryClient.fetchQuery(query);
    } catch (err) {
      console.error(err);
    }
  }

  return entity as T | null;
}
