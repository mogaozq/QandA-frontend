import React from 'react';
import { useAuth } from './Auth';
import Page from './Page';
import { StatusText } from './Styles';

interface Props {
  action: 'signout' | 'signout-callback';
}

function SignOutPage({ action }: Props) {
  let message = 'Signing out ...';
  const { signOut } = useAuth();
  switch (action) {
    case 'signout':
      signOut();
      break;
    case 'signout-callback':
      message = 'You successfully signed out!';
      break;
  }
  return (
    <Page title="Sign out">
      <StatusText>{message}</StatusText>
    </Page>
  );
}

export default SignOutPage;
