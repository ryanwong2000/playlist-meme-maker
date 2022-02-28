import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './Login';
import { Dashboard } from './Dashboard';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return (
    <>
      <h1>Spotify Playlist Meme Maker🎼</h1>
      {code ? <Dashboard code={code} /> : <Login />}
    </>
  );
}

export default App;
