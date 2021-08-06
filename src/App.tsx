import Routes from './routes';
import { AuthProvider } from './contexts';
import './assets/global-styles.scss';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
