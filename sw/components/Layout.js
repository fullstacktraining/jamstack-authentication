import React from 'react';
import Head from 'next/head';
import Nav from './Nav';
import { UserProvider } from '../lib/user';

const Layout = ({ user, loading = false, children }) => (
  <UserProvider value={{ user, loading}}>
    <Head>
      <title>Star Wars Characters</title>
    </Head>

    <Nav />

    <main>
      <div className="container">{children}</div>
    </main>
  </UserProvider>
);

export default Layout;
