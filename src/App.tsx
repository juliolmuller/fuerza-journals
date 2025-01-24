import { BrowserRouter } from 'react-router-dom';

import { AuthRoutes, PublicRoutes } from '~/routes';
import { useAuth } from '~/stores';
import '~/assets/global-styles.scss';

function App() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  return <BrowserRouter>{isAuthenticated ? <AuthRoutes /> : <PublicRoutes />}</BrowserRouter>;
}

export default App;
