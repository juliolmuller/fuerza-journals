import Routes from './routes';
import { AuthProvider } from './contexts';

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
