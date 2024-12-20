import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { LoginResponse } from "@/queries/authQuery";

const AuthContext = createContext<{
  signIn: (user: LoginResponse) => void;
  signOut: () => void;
  session: LoginResponse | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState<LoginResponse>("session-storage");

  return (
    <AuthContext.Provider
      value={{
        signIn: (user) => {
          // Perform sign-in logic here
          // setSession("xxx");
          setSession(user);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
