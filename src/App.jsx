import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Test2 from "./pages/Test2";
import CallbackPage from "./pages/CallbackPage";
import { AuthProvider } from "./contexts/AuthContext.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="*" element={<LoginPage />} />
            <Route path="/callback" element={<CallbackPage />} />

            <Route path="/home" element={<Test2 />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
