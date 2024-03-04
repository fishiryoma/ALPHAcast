import {
  BrowserRouter,
  Routes,
  Route,
  // createBrowserRouter,
  // RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FavoritePage from "./pages/FavoritePage";
import CallbackPage from "./pages/CallbackPage";
import ShowPage from "./pages/ShowPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import Root from "./pages/Root.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { ErrorBoundary } from "react-error-boundary";

// 先保留createBrowserRouter可以正常使用ErrorPage
// const router = createBrowserRouter([
//   { path: "*", element: <LoginPage />, errorElement: <ErrorPage /> },
//   { path: "/callback", element: <CallbackPage />, errorElement: <ErrorPage /> },
//   {
//     path: "/mypage",
//     element: <Root />,
//     children: [
//       { index: true, element: <MyPage /> },
//       { path: "/mypage/show/:categoryId", element: <ShowPage /> },
//       { path: "/mypage/favorite", element: <FavoritePage /> },
//     ],
//     errorElement: <ErrorPage />,
//   },
// ]);
function App() {
  return (
    <div>
      <BrowserRouter>
        {/* 雖然放上ErrorBoundary但沒有功效 */}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>
            <Route path="*" element={<LoginPage />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route
              path="/mypage"
              element={<Root />}
              errorElement={<ErrorPage />}
            >
              <Route index element={<MyPage />} />
              <Route path="/mypage/show/:categoryId" element={<ShowPage />} />
              <Route path="/mypage/favorite" element={<FavoritePage />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
    </div>
  );
}

export default App;

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre>{error}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
