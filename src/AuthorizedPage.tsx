import React from 'react';
import { useAuth } from './Auth';
import Page from './Page';

const AuthorizedPage: React.FC = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Page title="You don't have access to this page">{null}</Page>;

  return <>{children}</>;
};

export default AuthorizedPage;
