import React from 'react'
import Head from 'next/head'
import Nav from './Nav';

const Layout = ({ children }) => (
  <div>
    <Head>
      <title>Star Wars</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Nav />
    
    <main>
      <div>{children}</div>
    </main>
  </div>
)

export default Layout