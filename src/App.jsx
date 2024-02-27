import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FavoritePage from "./pages/FavoritePage";
import CallbackPage from "./pages/CallbackPage";
import ShowPage from "./pages/ShowPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import Root from "./pages/Root.jsx";

import { ApiProvider } from "./contexts/ApiContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/callback",
    element: <CallbackPage />,
  },
  {
    path: "/mypage",
    element: <Root />,
    children: [
      {
        index: true,
        element: <MyPage />,
      },
      {
        path: "/mypage/show/:id",
        element: <ShowPage />,
      },
      {
        path: "/mypage/favorite",
        element: <FavoritePage />,
      },
    ],
  },
]);
function App() {
  return (
    <div>
      <ApiProvider>
        <RouterProvider router={router} />
      </ApiProvider>
    </div>
  );
}

export default App;
