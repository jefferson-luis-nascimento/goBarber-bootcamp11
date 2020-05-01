import React from 'react';

import { AuthProvider } from './hooks/AuthContext';

import GlobalStyle from './styles/global';

import ToastContainer from './components/ToastContainer';

import SignIn from './pages/SignIn';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyle />
    <ToastContainer />
  </>
);

export default App;
