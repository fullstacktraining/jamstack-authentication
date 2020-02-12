import React from 'react'
import Layout from '../components/Layout'
import { useFetchUser } from '../lib/user';

const Home = () => {
  const { user, loading } = useFetchUser();
  return (
    <Layout user={user}>
      <div className="jumbotron">
        <h1 className="display-3">Star Wars Characters</h1>
        <p className="lead">This is an example app on <a href=
        "https://jamstack.training/">JAMstack.training</a> showcasing <a href="https://nextjs.org/">Next.js</a>, <a href="https://zeit.co/">Zeit Now</a>, <a href="https://auth0.com">Auth0</a>, <a href="https://strapi.io">Strapi</a> and <a href="https://cloudinary.com/">Cloudinary</a>.</p>
        <p className="lead">Available API endpoints:</p>
        <ul>
          <li><code>/api/characters</code> - List all characters</li>
          <li><code>/api/character/ID</code> - List one character</li>
          <li><code>/api/favourites</code> - List user favourites</li>
        </ul>
      </div>
    </Layout>
  )
}

export default Home
