import { BrowserRouter } from 'react-router-dom';
import { AuthRoutes, PublicRoutes } from './routes';
import { useAuth } from './stores';
import './assets/global-styles.scss';

function App() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated());

  return (
    <BrowserRouter>
      <BrowserRouter>{isAuthenticated ? <AuthRoutes /> : <PublicRoutes />}</BrowserRouter>
    </BrowserRouter>
  );
}

export default App;
