import Routes from './routes';
import { AuthProvider } from './contexts';
import { JournalsProvider } from './contexts';
import './assets/global-styles.scss';

function App() {
  return (
    <AuthProvider>
      <JournalsProvider>
        <Routes />
      </JournalsProvider>
    </AuthProvider>
  );
}

export default App;
