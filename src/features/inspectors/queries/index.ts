import type { CacheQuery } from "@/types";
import { getInspector } from "../api";

export function inspectorQuery(
  inspectorId: string,
): CacheQuery<Awaited<ReturnType<typeof getInspector>>> {
  return {
    queryKey: ["inspector", inspectorId],
    queryFn: async () => {
      const res = await getInspector(inspectorId);
      return res;
    },
  };
}

export default null;
