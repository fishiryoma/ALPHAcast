import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FavoritePage from "./pages/FavoritePage";
import CallbackPage from "./pages/CallbackPage";
import ShowPage from "./pages/ShowPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import Root from "./pages/Root.jsx";

import { ApiProvider } from "./contexts/ApiContext.jsx";

function App() {
  return (
    <div>
      <ApiProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="/mypage" element={<Root />}>
              <Route index element={<MyPage />} />
              <Route path="/mypage/show/:categoryId" element={<ShowPage />} />
              <Route path="/mypage/favorite" element={<FavoritePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </div>
  );
}

export default App;
