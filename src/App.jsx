import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Test2 from "./pages/Test2";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LoginPage />} />
          <Route path="/home" element={<Test2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
