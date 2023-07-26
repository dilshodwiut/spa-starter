import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { UserWithAuth } from "@/types";

interface AuthContext {
  user: UserWithAuth;
  setUser: Dispatch<SetStateAction<UserWithAuth>>;
}

const authContext = createContext<AuthContext>({
  user: { isAuth: false, first_name: "", last_name: "", middle_name: "" },
  setUser: () => {
    //
  },
});

authContext.displayName = "authContext";

const AuthContextConsumer = authContext.Consumer;

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export { AuthContextConsumer as AuthConsumer, authContext, useAuthContext };

function useAuthContext(): React.ContextType<React.Context<AuthContext>> {
  return useContext(authContext);
}
