import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import React, { useState } from 'react';
import { AuthSettings } from './AppSettings';

interface IAuth0Context {
  isAuthenticated: boolean;
  user?: Auth0User;
  signIn: () => void;
  signOut: () => void;
  loading: boolean;
}

interface Auth0User {
  name: string;
  email: string;
}

export const Auth0Context = React.createContext<IAuth0Context>({
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
  loading: true,
});

export const useAuth = (): IAuth0Context => {
  return React.useContext(Auth0Context);
};

function AuthProvider({ children }: any) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<Auth0User | undefined>();
  const [auth0Client, setAuth0Client] = useState<Auth0Client>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAuth0ClientFromState = () => {
    if (auth0Client === undefined) {
      throw new Error('Auth0 client not set');
    }
    return auth0Client;
  };

  React.useEffect(() => {
    const initAuth0 = async () => {
      setLoading(true);
      const auth0Client1 = await createAuth0Client(AuthSettings);
      setAuth0Client(auth0Client1);

      if (
        window.location.pathname === '/signin-callback' &&
        window.location.search.indexOf('code=') > -1
      ) {
        await auth0Client1.handleRedirectCallback();
        window.location.replace(window.location.origin);
      }

      const isAuthenticated1 = await auth0Client1.isAuthenticated();
      if (isAuthenticated1) {
        const user = await auth0Client1.getUser();
        setUser({
          name: user?.name!,
          email: user?.email!,
        });
      }
      setIsAuthenticated(isAuthenticated1);
      setLoading(false);
    };
    initAuth0();
  }, []);

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        signIn: () => getAuth0ClientFromState().loginWithRedirect(),
        signOut: () =>
          getAuth0ClientFromState().logout({
            client_id: AuthSettings.client_id,
            returnTo: window.location.origin + '/signout-callback',
          }),
        loading,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
}

export const getAccessToken = async () => {
  const auth0Client = await createAuth0Client(AuthSettings);
  const accessToken = await auth0Client.getTokenSilently();
  return accessToken;
};

export default AuthProvider;
