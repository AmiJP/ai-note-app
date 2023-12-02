import { Toaster } from "./components/ui/toaster";
import { Routes, Route } from "react-router-dom";

import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { AuthProvider } from "./Provider/AuthProvider";
import { RequireAuth } from "./components/RequireAuth";
import { ErrorPage } from "./pages/ErrorPage";
import { AddNote } from "./pages/AddNote";
import { EditNote } from "./pages/EditNote";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route element={<Navbar />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route path="/create" element={<AddNote />} />
              <Route path="/edit/:noteId" element={<EditNote />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </AuthProvider>
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
