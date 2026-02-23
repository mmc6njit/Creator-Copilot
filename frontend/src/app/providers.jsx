import { AuthContextProvider } from "@/features/auth/context/AuthContext";
import { Toaster } from "sonner";

export function AppProviders({ children }) {
  return (
    <AuthContextProvider>
      {children}
      <Toaster richColors position="top-right" />
    </AuthContextProvider>
  );
}
