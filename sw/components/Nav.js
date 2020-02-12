import React from 'react';
import Link from './Link';

import { useUser } from '../lib/user';

const Nav = () => {
  const { user, loading } = useUser();
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top">
      <a className="navbar-brand" href="/">SW App</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link href="/"><a className="nav-link">Home</a></Link>
          </li>
          <li className="nav-item">
            <Link href="/characters"><a className="nav-link">Characters</a></Link>
          </li>
          {!loading &&
            (user ? (
              <>
                <li className="nav-item">
                  <Link href="/favourites"><a className="nav-link">Favourites</a></Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/api/logout">Logout</a>
                </li>
              </>
            ) : (
              <li className="nav-item right">
                <a className="nav-link" href="/api/login">Login</a>
              </li>
            ))}
        </ul>
        {!loading && 
        (user ? (
          <span className="navbar-text">
            Welcome back {user.name ? user.name : user.username}
          </span>
        ) : ('')
        )}
      </div>
    </nav>
  );
};

export default Nav;
