import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { supabase } from "@/db/supabase";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import routes from "./routes";

const App = () => {
  return (
    <Router>
      <AuthProvider client={supabase}>
        <Toaster position="top-right" richColors />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
