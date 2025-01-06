import { AuthContextProvider } from "@/contexts/auth-context";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {<AuthContextProvider>{children}</AuthContextProvider>}
    </div>
  );
}

export default layout;
