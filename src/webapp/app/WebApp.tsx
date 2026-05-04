import { HashRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { AppProviders } from './providers/AppProviders';

export default function WebApp() {
  return (
    <HashRouter>
      <AppProviders>
        <div className="size-full max-w-md mx-auto bg-white overflow-x-hidden">
          <AppRouter />
        </div>
      </AppProviders>
    </HashRouter>
  );
}
