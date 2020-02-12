import Router from 'next/router';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

export const setToken = token => {
  if (!process.browser) {
    return;
  }

  Cookies.set('username', token.user.username);
  Cookies.set('jwt', token.jwt);
  Cookies.set('_id', token.user._id);

  if (Cookies.get('username')) {
    Router.reload('/');
  }
};

export const unsetToken = () => {
  if (!process.browser) {
    return;
  }

  Cookies.remove('jwt');
  Cookies.remove('username');
  Cookies.remove('_id');

  Router.reload('/');
}

export const getUserFromLocalCookie = () => {
  return Cookies.get('username');
}

export const getTokenFromLocalCookie = () => {
  return Cookies.get('jwt');
}

export const getTokenFromServerCookie = req => {
  if (!req.headers.cookie || '') {
    return undefined;
  }
  const jwtCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('jwt='));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split('=')[1];
  return jwt;
}

export const getIdFromServerCookie = req => {
  if (!req.headers.cookie || '') {
    return undefined;
  }
  const idCookie = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith('_id='));
  if (!idCookie) {
    return undefined;
  }
  const id = idCookie.split('=')[1];
  return id;
}