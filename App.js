import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/services/firebase';

import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/services/theme';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

export default function App() {
  const [user, setUser] = React.useState(undefined);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u || null));
    return unsub;
  }, []);

  if (user === undefined) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
