import React, { useState } from 'react';
import Link from './Link';
import fetch from 'isomorphic-unfetch';

import { useUser } from '../lib/user';
import { setToken, unsetToken } from '../lib/auth';

const Nav = () => {
  const { user, loading } = useUser();
  const [data, setData] = useState({
    identifier: '',
    password: ''
  });

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await fetch(`${process.env.API_BASE_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier: data.identifier,
        password: data.password
      })
    });
    const responseData = await response.json();
    setToken(responseData);
  }

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  };

  const logout = () => {
    unsetToken();
  }

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
                  <a className="nav-link" onClick={logout} style={{ cursor: 'pointer' }}>Logout</a>
                </li>
              </>
            ) : (
              ''
            ))}
        </ul>
        {!loading && !user ? (
          <form onSubmit={handleSubmit} className="form-inline">
            <input type="text" name="identifier" onChange={handleChange} className="form-control mr-sm-2" placeholder="Username" required />
            <input type="password" name="password" onChange={handleChange} className="form-control mr-sm-2" placeholder="Password" required />
            <button className="btn btn-success my-2 my-sm-0" type="submit">Login</button>
          </form>
        ) : ('')}
        {!loading &&
          (user ? (
            <span className="navbar-text">
              Welcome back {user}
            </span>
          ) : ('')
          )
        }
      </div>
    </nav>
  );
};

export default Nav;
