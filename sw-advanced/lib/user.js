import React from 'react';
import { getUserFromLocalCookie } from './auth';

let userState;

const User = React.createContext({ user: null, loading: false });

export const UserProvider = ({ value, children }) => {
  const { user } = value;

  React.useEffect(() => {
    if (!userState && user) {
      userState = user;
    }
  }, []);

  return <User.Provider value={value}>{children}</User.Provider>;
};

export const useUser = () => React.useContext(User);

export const useFetchUser = () => {
  const [data, setUser] = React.useState({
    user: userState || null,
    loading: userState === undefined
  });

  React.useEffect(() => {
    if (userState !== undefined) {
      return;
    }

    let isMounted = true;

    const user = getUserFromLocalCookie();
    if (isMounted) {
      setUser({ user, loading: false });
    }

    return () => {
      isMounted = false;
    };
  }, [userState]);

  return data;
};
