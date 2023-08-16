import type { CacheQuery } from "@/types";
import { getData } from "../api";

export function statsQuery(): CacheQuery<Awaited<ReturnType<typeof getData>>> {
  return {
    queryKey: ["stats"],
    queryFn: getData,
  };
}

export default null;
