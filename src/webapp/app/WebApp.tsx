import { HashRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { AppProviders } from './providers/AppProviders';
import { ScrollToTop } from './ScrollToTop';

export default function WebApp() {
  return (
    <HashRouter>
      <ScrollToTop />
      <AppProviders>
        <div id="app-root" className="w-full max-w-md mx-auto bg-white overflow-x-clip min-h-full">
          <AppRouter />
        </div>
      </AppProviders>
    </HashRouter>
  );
}
