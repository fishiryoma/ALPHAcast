import Button from "./components/Button";
import { getSpotifyToken } from "./api/auth-spotify";

function App() {
  function handleClick() {
    getSpotifyToken();
  }

  return (
    <div>
      <Button classname="green" onClick={handleClick}>
        使用SPOTIFY帳號登入
      </Button>
    </div>
  );
}

export default App;
