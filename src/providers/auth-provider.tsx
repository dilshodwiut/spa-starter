import { useState, useMemo } from "react";
import { authContext } from "@/contexts/auth-context";
import type { User, UserWithAuth } from "@/types";

interface Props {
  children: React.ReactElement;
}

const accessToken = localStorage.getItem("access_token");
const userCreds: User = JSON.parse(localStorage.getItem("user")!) ?? {
  first_name: "",
  last_name: "",
  middle_name: "",
};

export default function AuthProvider(props: Props): React.ReactElement {
  const { children } = props;

  const [user, setUser] = useState<UserWithAuth>({
    isAuth: Boolean(accessToken),
    first_name: userCreds.first_name,
    last_name: userCreds.last_name,
    middle_name: userCreds.middle_name,
  });

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
