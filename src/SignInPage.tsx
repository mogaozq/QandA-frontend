import { useEffect } from 'react';
import { useAuth } from './Auth';
import Page from './Page';
import { StatusText } from './Styles';

interface Props {
  action: ActionType;
}

type ActionType = 'signin' | 'signin-callback';

function SignInPage({ action }: Props) {
  const { signIn } = useAuth();

  useEffect(() => {
    if (action === 'signin') signIn();
  }, [action, signIn]);

  return (
    <Page title="Sign In">
      <StatusText>Signing in ...</StatusText>
    </Page>
  );
}

export default SignInPage;
