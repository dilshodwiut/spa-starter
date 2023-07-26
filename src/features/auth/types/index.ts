import type { User } from "@/types";

interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

type sthElse = unknown;

export type { AuthResponse, sthElse };
