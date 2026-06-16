import { AuthProvider } from "./context/AuthContext/AuthProvider";
import { LibraryDataProvider } from "./context/LibraryDataContext/LibraryDataProvider";
import { useAuth } from "./context/AuthContext/useAuth";

function LibraryDataWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <LibraryDataProvider user={user}>
      {children}
    </LibraryDataProvider>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
        <LibraryDataWrapper>
          {children}
        </LibraryDataWrapper>
    </AuthProvider>
  );
}