import { useContext } from "react";
import { LibraryDataContext } from "./LibraryDataContext";

export function useLibraryDataContext() {
  const context = useContext(LibraryDataContext);

  if (!context) {
    throw new Error(
      "useLibraryDataContext must be used inside LibraryDataProvider",
    );
  }

  return context;
}